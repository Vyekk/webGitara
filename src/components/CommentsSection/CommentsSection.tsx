import Button from 'components/Button/Button';
import styles from 'components/CommentsSection/CommentsSection.module.scss';

type CommentsSectionProps = {
    song: object;
};

const CommentsSection = (song: CommentsSectionProps) => {
    const addComment = () => {
        console.log('Dodaj komentarz');
    };

    return (
        <div className={styles.commentsSectionWraper}>
            <div className={styles.playTopWrapper}>
                <Button transparent>Wróć do biblioteki</Button>
                {/* Tytuł utworu */}
                <Button transparent onClick={addComment}>
                    Dodaj komentarz
                </Button>
            </div>
        </div>
    );
};

export { CommentsSection };
