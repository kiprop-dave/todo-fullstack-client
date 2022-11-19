import { Page } from "../utilStyles/styles";
import Form from "../components/Form";

function SignUp() {
  return (
    <Page>
      <Form signUp={true} />
    </Page>
  );
}

export default SignUp;
