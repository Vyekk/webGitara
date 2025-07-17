import Button from 'components/Button/Button';
import styles from 'components/CommentsSection/CommentsSection.module.scss';
import SongsLibrary from 'components/SongsLibrary/SongsLibrary';
import { ModalContext } from 'components/Modal/ModalContext';
import Title from 'components/Title/Title';
import { useContext, useState } from 'react';
import { Song } from 'types';
import useRequiredUser from 'utils/useRequiredUser';
import { useSongs } from 'context/SongsContext';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

type CommentsSectionProps = {
    song: Song;
};

const CommentsSection = ({ song }: CommentsSectionProps) => {
    const [commentedSong, setCommentedSong] = useState<Song>(song);
    const [isCommenting, setIsCommenting] = useState(false);
    const { openModal, setModal } = useContext(ModalContext);
    const { addCommentToSong, deleteCommentFromSong } = useSongs();
    const user = useRequiredUser();

    const handleAddComment = () => {
        setIsCommenting(true);
    };

    const handleBackToLibrary = () => {
        setModal(<SongsLibrary />);
        openModal();
    };

    const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;

        const newComment = {
            idComment: uuidv4(),
            content: target.commentContent.value,
            author: {
                idUser: user.idUser,
                username: user.username,
            },
        };

        await addCommentToSong(song.idSong, newComment);

        setCommentedSong((prev: Song) => ({
            ...prev,
            comments: prev.comments ? [...prev.comments, newComment] : [newComment],
        }));

        setIsCommenting(false);
    };

    const handleDeleteComment = async (commentId: string) => {
        await deleteCommentFromSong(song.idSong, commentId);

        setCommentedSong((prev: Song) => ({
            ...prev,
            comments: prev.comments?.filter((c) => c.idComment !== commentId),
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
                            <div className={styles.commentAuthor}>{comment.author.username}</div>
                            <div
                                className={`${styles.deleteCommentButton} ${
                                    user.idUser === comment.author.idUser ? styles.show : ''
                                }`}
                                onClick={() => handleDeleteComment(comment.idComment)}
                            >
                                X
                            </div>
                        </div>
                        <div className={styles.commentAuthorAvatar}>
                            <div className={styles.avatarWrapper}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { CommentsSection };
