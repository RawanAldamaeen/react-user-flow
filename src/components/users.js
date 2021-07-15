import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { usersList, Search } from "../store/userAction";
import ReactPaginate from "react-paginate";
import { Field, Formik, Form } from "formik";

const Users = () => {
  const users = useSelector((state) => state.user.list);
  const allUsers = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();

  function handlePageClick({ selected: selectedPage }) {
    dispatch(usersList(selectedPage));
  }

  useEffect(() => {
    dispatch(usersList());
  }, []);

  return (
    <div className="container profile-page">
      <div className="row justify-content-center">
        <div className="col-6">
          <Formik initialValues={{ search: "" }}>
            {({ values, handleSubmit }) => (
              <Form
                className="card card-sm"
              >
                <div className="card-body row no-gutters align-items-center">
                  <div className="col">
                    <Field
                      className="form-control rounded"
                      type="search"
                      name="search"
                      placeholder="Search..."
                      value={values.search}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                    onClick={() => dispatch(Search(values.search) )}
                      className="btn btn-md ml-2 btn-outline-primary"
                      type="submit"
                      
                    >
                      Search
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="row justify-content-center">
        {users
          ? users.map((user) => (
              <div className="col-xl-4" key={user.id}>
                <div className="card profile-header">
                  <div className="body">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="profile-image">
                          <img
                            src="http://www.gravatar.com/avatar/?d=mp"
                            alt=""
                          />{" "}
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <h4>{user.name}</h4>
                        <span>Phone: {user.mobile_number} </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <div  className="col-xl-4">
        {users === [] ? <h3>There is no users</h3>:null}
        </div> 
      <ReactPaginate
        pageCount={Math.ceil(allUsers / 10)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        onPageChange={handlePageClick}
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Users;
