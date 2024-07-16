import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import { Result } from "antd";
import { useUser } from "../context/Store";
import { useEffect, useState } from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { deleteDoc, doc, db } from "../config/firebase.config";
import toast from "react-hot-toast";
import "../index.scss";

function AdminUserReviewsComp() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [userReviews, setUserReviews] = useState(null);
  const [laoding, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    if (user) {
      setUserReviews(user.allUserReviews);
      setLoading(false);
    } else {
      null;
    }
  }, [user]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAdminReviewDelete = async (reviewDocId) => {
    try {
      await deleteDoc(doc(db, "userReviews", reviewDocId));
      toast.success("Review deleted successfully.");
      setUserReviews((prevOrders) =>
        prevOrders.filter((order) => reviewDocId !== reviewDocId)
      );
    } catch (error) {
      toast.error("Plese try again.");
    }
  };

  if (laoding) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="laoder"></div>
      </div>
    );
  }

  return (
    <div>
      {userReviews.length === 0 ? (
        <div>
          <Result status="warning" title="There are no reviews yet." />
        </div>
      ) : (
        <TableContainer component={Paper} className="rounded-xl">
          <Table className="border border-collapse border-gray-200">
            <TableHead className="bg-tertiary">
              <TableRow>
                <TableCell className="border border-gray-200">
                  Sr. No.
                </TableCell>
                <TableCell className="border border-gray-200">
                  Reviewer Name
                </TableCell>
                <TableCell className="border border-gray-200">
                  Reviewer Status
                </TableCell>
                <TableCell className="border border-gray-200">
                  Reviewer Comment
                </TableCell>
                <TableCell className="border border-gray-200">
                  Delete Review
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userReviews
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((reviews, index) => (
                  <TableRow key={index}>
                    <TableCell className="border border-gray-200">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {reviews.reviewerName}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {reviews.reviewerStatus}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {reviews.reviewerComment}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      <Button
                        onClick={() => handleAdminReviewDelete(reviews.doc)}
                        startIcon={<MdOutlineDeleteSweep />}
                        className="deleteReviewBtn"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={userReviews.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </div>
  );
}

export default AdminUserReviewsComp;
