import { AxiosRequestConfig } from "axios";

declare interface Payment {
  id: string;
  amount: number;
  status: string;
}

declare interface Post {
  id: string;
  content: string;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface useAxiosProps {
  axiosParams: AxiosRequestConfig;
  trigger: any;
}
