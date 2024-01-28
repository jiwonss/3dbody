import "./ChallengeCard.css"

const ChallengeCard = () => {
  return (
    <div className="card">
      <div className="content">
        <div>
          <img src="challenge/example.jpg" alt="..." />
        </div>
        <div className="title">챌린지 제목입니다</div>
        <div class="description">
          챌린지 내용입니다
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
