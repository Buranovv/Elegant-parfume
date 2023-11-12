interface Universal {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
  map: (func: object) => void;
}

export default Universal;
