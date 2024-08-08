import Button from 'components/Button/Button';
import styles from 'components/CommentsSection/CommentsSection.module.scss';
import Title from 'components/Title/Title';
import { useState } from 'react';
import { Song } from 'types';

type CommentsSectionProps = {
    song: Song;
};

const CommentsSection = ({ song }: CommentsSectionProps) => {
    const [commentedSong, setCommentedSong] = useState<Song>(song);
    const addComment = () => {
        console.log('Dodaj komentarz');
        setCommentedSong((prev: Song) => ({
            ...prev,
            comments: prev.comments ? [...prev.comments, ['Komentarz', 'Autor']] : [['Komentarz', 'Autor']],
        }));
    };

    return (
        <div>
            <div className={styles.commentsTopSectionWraper}>
                <Button transparent>Wróć do biblioteki</Button>
                <Title tag="h3">{song.songTitle}</Title>
                <Button transparent onClick={addComment}>
                    Dodaj komentarz
                </Button>
            </div>
            <div className={styles.commentsWrapper}>
                {commentedSong.comments?.map((comment, index) => (
                    <div key={index} className={styles.comment}>
                        <div className={styles.commentText}>{comment[0]}</div>
                        <div className={styles.commentAuthor}>{comment[1]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { CommentsSection };
