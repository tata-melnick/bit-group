import React, { useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import Button from "../Button";
import Modal from "../Modal";
import { addPost, removePost } from "../../store/posts";
import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { changedPost } = useSelector((state) => state.posts);

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const openConfirmModal = () => setIsOpenConfirmModal(true);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openAddModal = () => setIsOpenAddModal(true);
  const closeAddModal = () => setIsOpenAddModal(false);

  const setTitle = (e) =>
    setNewPost((prevState) => ({ ...prevState, title: e.target.value }));
  const setBody = (e) =>
    setNewPost((prevState) => ({ ...prevState, body: e.target.value }));

  const add = () => {
    dispatch(addPost(newPost));
    closeAddModal();
    setNewPost({ title: "", body: "" });
  };
  const remove = () => {
    dispatch(removePost());
    closeConfirmModal();
  };

  return (
    <>
      <div className={styles.container}>
        <DynamicFeedIcon sx={{ mr: 1, mb: "5px", fontSize: "2.5rem", color: "#ffffff" }} />
        <div className={styles.actions}>
          <Button type="success" onClick={openAddModal}>
            Создать пост
          </Button>
          <Button
            type="error"
            disabled={!changedPost}
            onClick={openConfirmModal}
          >
            Удалить пост
          </Button>
        </div>
      </div>
      <Modal open={isOpenConfirmModal} onClose={closeConfirmModal}>
        <div className={styles.confirmModal}>
          <div>Вы точно хотите удалить пост "{changedPost?.title}"</div>
          <div className={styles.modalActions}>
            <Button type="error" onClick={remove}>
              Да
            </Button>
            <Button type="success" onClick={closeConfirmModal}>
              Нет
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={isOpenAddModal} onClose={closeAddModal}>
        <div className={cn(styles.confirmModal, styles.addModal)}>
          <div>Добавление поста</div>
          <input
            className={styles.input}
            type="text"
            placeholder="Заголовок"
            onChange={setTitle}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Описание"
            onChange={setBody}
          />
          <div className={styles.modalActions}>
            <Button type="success" onClick={add}>
              Добавить
            </Button>
            <Button type="error" onClick={closeAddModal}>
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
