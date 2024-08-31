import { useEffect, useState } from "react";
import { useUser } from "../context/Store";
import { Avatar } from "@mui/material";
import "../index.scss";
import { Carousel } from "antd";

function ReviewsCardComp() {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useUser();

  useEffect(() => {
    if (user && user.allUserReviews?.length > 0) {
      setUserReviews(user.allUserReviews);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (userReviews.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">No reviews available</h2>
      </div>
    );
  }

  return (
    <div className="m-[10px] pl-[50px] pr-[50px] pb-[50px]">
      <h2 className="text-4xl font-semibold text-center mb-10">Reviews</h2>
      <Carousel
        autoplaySpeed={2000}
        arrows={false}
        dotPosition="right"
        autoplay={true}
        infinite={true}
      >
        {userReviews.map((reviews, index) => (
          <div key={index} className="rounded-xl">
            <div className="flex flex-col justify-center items-center p-4 gap-4">
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex mr-4">
                  <Avatar
                    sx={{ width: "100px", height: "100px" }}
                    src={reviews.reviewerAvatar || ""}
                    alt={reviews.reviewerName}
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-0">
                  <h2 className="text-xl font-bold">{reviews.reviewerName}</h2>
                  <h2 className="text-lg font-medium">
                    {reviews.reviewerStatus}
                  </h2>
                </div>
              </div>
              <div>
                <h1 className="text-2xl">{reviews.reviewerComment}</h1>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ReviewsCardComp;
