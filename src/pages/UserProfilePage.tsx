import { useUpdateMyUser, useGetMyUser } from "@/api/MyUserAPI";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { mutateAsync: updateUser, isPending } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Imposible leer el perfil del Usuario</span>;
  }
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isPending || isGetLoading}
    />
  );
};

export default UserProfilePage;
