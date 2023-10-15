import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";

import { changePost, getPosts } from "../../store/posts";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styles from "./main.module.scss";

const Main = () => {
  const dispatch = useDispatch();

  const { list, isLoading } = useSelector((state) => state.posts);

  const rowClick = ({ data }) => dispatch(changePost(data));

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const [columnDefs, defaultColDef] = useMemo(
    () => [
      [
        { field: "title", filter: false, headerName: "Заголовок" },
        { field: "body", filter: false, headerName: "Описание" },
      ],
      {
        width: 400,
        sortable: true,
      },
    ],
    [],
  );

  return (
    <>
      <div className={styles.container}>
        {isLoading ? (
          <div>Загрузка...</div>
        ) : (
          <div className={`ag-theme-alpine ${styles.table}`}>
            <AgGridReact
              animateRows
              onRowClicked={rowClick}
              rowData={list}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection="single"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
