import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const { token, username, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const isSuperadmin = username === 'emilys';
  console.log(isSuperadmin);
  return { token, username, isAuthenticated, isSuperadmin };
};
