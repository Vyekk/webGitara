import Button from 'components/Button/Button';
import styles from 'components/CommentsSection/CommentsSection.module.scss';
import SongsLibrary from 'components/SongsLibrary/SongsLibrary';
import { ModalContext } from 'components/Modal/ModalContext';
import Title from 'components/Title/Title';
import { useContext, useState } from 'react';
import { Song } from 'types';

type CommentsSectionProps = {
    song: Song;
};

const CommentsSection = ({ song }: CommentsSectionProps) => {
    const [commentedSong, setCommentedSong] = useState<Song>(song);
    const [isCommenting, setIsCommenting] = useState(false);
    const { openModal, setModal } = useContext(ModalContext);
    const handleAddComment = () => {
        setIsCommenting(true);
    };

    const handleBackToLibrary = () => {
        setModal(<SongsLibrary />);
        openModal();
    };

    const handleSendComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const newComment = {
            content: target.commentContent.value,
            author: 'Autor',
        };

        setCommentedSong((prev: Song) => ({
            ...prev,
            comments: prev.comments ? [...prev.comments, newComment] : [newComment],
        }));

        setIsCommenting(false);
    };

    const handleDeleteComment = (index: number) => {
        setCommentedSong((prev: Song) => ({
            ...prev,
            comments: prev.comments?.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className={styles.commentsSectionWrapper}>
            <div className={styles.commentsTopSectionWraper}>
                <Button transparent onClick={handleBackToLibrary}>
                    Wróć do biblioteki
                </Button>
                <Title tag="h3">{song.songTitle}</Title>
                <Button transparent onClick={handleAddComment}>
                    Dodaj komentarz
                </Button>
            </div>
            <div className={styles.commentsWrapper}>
                {isCommenting && (
                    <div className={styles.commentFormWrapper}>
                        <form onSubmit={handleSendComment} className={styles.commentForm}>
                            <Title tag="h4" orange>
                                Dodaj komentarz
                            </Title>
                            <textarea
                                maxLength={100}
                                title="commmentContent"
                                name="commentContent"
                                className={styles.commentTextArea}
                                placeholder="Wpisz komentarz (max 100 znaków)"
                                required
                            ></textarea>
                            <div className={styles.addCommentButtonsWrapper}>
                                <Button type="submit">Wyślij</Button>
                                <Button isDark onClick={() => setIsCommenting(false)}>
                                    Anuluj
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
                <Title tag="h4" orange>
                    Komentarze
                </Title>
                {!commentedSong.comments && <div className={styles.noComments}>Brak komentarzy</div>}
                {commentedSong.comments?.map((comment, index) => (
                    <div className={styles.commentContainer} key={index}>
                        <div className={styles.comment}>
                            <div className={styles.commentContent}>{comment.content}</div>
                            <div className={styles.commentAuthor}>{comment.author}</div>
                            <div className={styles.deleteCommentButton} onClick={() => handleDeleteComment(index)}>
                                X
                            </div>
                        </div>
                        <div className={styles.commentAuthorAvatar}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { CommentsSection };
