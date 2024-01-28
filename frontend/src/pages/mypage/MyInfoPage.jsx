import BackButton from './../../components/common/BackButton';

const MyInfoPage = () => {
    const user = {} 
    return(
        <div>
            <BackButton/>
            <div>
                <p>이름</p>
                <p>{user.name}</p>
                <hr />
            </div>
            <div>
                <p>이메일</p>
                <p>{user.email}</p>
                <hr />
            </div>
            <div>
                <p>닉네임</p>
                <p>{user.name}</p>
                <hr />
            </div>
            <div>
                <p>성별</p>
                <p>{user.name}</p>
                <hr />
            </div>
            <div>
                <p>신장</p>
                <p>{user.name}</p>
                <hr />
            </div>
            <div>
                <p>생년월일</p>
                <p>{user.name}</p>
                <hr />
            </div>
        </div>
    )
}

export default MyInfoPage