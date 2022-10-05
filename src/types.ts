export type User = {
  host: string;
  username: string;
  password: string;
  inviteToken?: string;
};

export type UserFormErrors = {
  username: string;
  password: string;
  host: string;
};

export type IconInteface = {
  color?: string;
  width?: number;
  heigth?: number;
};

export type WhoAmI = {
  username: string;
  roles: Array<string>;
  spentWatching: number;
  picture: string | null;
};

export type NavigationType = {
  dispatch: (action: any) => void;
  navigate: (routeName: string, params?: any) => void;
  goBack: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  reset: (actions: any) => void;
  setParams: (params: any) => void;
  setOptions: (options: any) => void;
  isFocused: () => boolean;
  canGoBack: () => boolean;
  getParam: (param: string) => any;
  getState: () => any;
  getParent: () => NavigationType;
  getId: () => string;
  addListener: (event: string, callback: Function) => void;
  removeListener: (event: string, callback: Function) => void;
  jumpTo: (routeName: string) => void;
};
