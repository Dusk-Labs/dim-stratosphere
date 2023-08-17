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

export type EpisodeFile = {
  audio: null;
  audio_language: string;
  channels: null;
  codec: string;
  container: string;
  corrupt: boolean;
  duration: number;
  episode: number;
  id: number;
  library_id: number;
  media_id: number;
  original_resolution: null;
  profile: string;
  quality: string;
  raw_name: string;
  raw_year: null;
  season: number;
  target_file: string;
};

// example of a file
// {
//   "audio": null,
//   "audio_language": "English",
//   "channels": null,
//   "codec": "h264",
//   "container": "matroska,webm",
//   "corrupt": false,
//   "duration": 30,
//   "episode": 3,
//   "id": 14,
//   "library_id": 2,
//   "media_id": 22,
//   "original_resolution": null,
//   "profile": "High",
//   "quality": "1080",
//   "raw_name": "Modern Family",
//   "raw_year": null,
//   "season": 1,
//   "target_file": "/media/Series/Modern Family/Modern Family Season 1/Modern Family S01E03.mkv",
// },
