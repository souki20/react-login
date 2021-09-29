import { auth  } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const handleSubmit = async (event) => {
    // submitイベントのキャンセル
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value);
      history.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>ユーザー登録</h1>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password"/>
        </div>
        <div>
          <button>登録</button>
        </div>
        <div>
          ユーザー登録済の場合は<Link to={'/login'}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};

export default SignUp;