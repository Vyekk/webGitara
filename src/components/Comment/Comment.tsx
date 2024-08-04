type CommentProps = {
    comment: object;
};

const Comment = ({ comment }: CommentProps) => {
    return (
        <div>
            <h3>{}</h3>
            <p>{}</p>
        </div>
    );
};
