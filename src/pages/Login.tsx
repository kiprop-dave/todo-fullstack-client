import { Page } from "../utilStyles/styles";
import Form from "../components/Form";

function Login() {
  return (
    <Page>
      <Form login={true} />
    </Page>
  );
}

export default Login;
