import { useCreateMyUser } from "@/api/MyUserAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const createUser = useCreateMyUser();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    const createUserWithToken = async () => {
      if (user?.sub && user?.email && !hasCreatedUser.current) {
        try {
          const token = await getAccessTokenSilently();

          createUser.mutate(
            { auth0Id: user.sub, email: user.email },
            {
              onSuccess: () => {
                console.log("User created successfully with token:", token);
              },
            }
          );

          hasCreatedUser.current = true;
        } catch (error) {
          console.error("Error obteniendo el token:", error);
        }
      }
    };

    createUserWithToken();
    navigate("/");
  }, [createUser, navigate, user, getAccessTokenSilently]);

  return <div>Loading...</div>;
};

export default AuthCallbackPage;
