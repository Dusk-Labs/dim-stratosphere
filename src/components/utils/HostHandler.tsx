import Url from "url-parse";

// url example obj = {
//   auth?: "";
//   hash?: "";
//   host?: "192.123.1.1:8080";
//   hostname?: "192.123.1.1";
//   href?: "http://192.123.1.1:8080/";
//   origin?: "http://192.123.1.1:8080";
//   password?: "";
//   pathname?: "/";
//   port?: "8080";
//   protocol?: "http:";
//   query?: "";
//   slashes?: true;
//   username?: "";
// };

// determine if host hast protocol and port. if not, adds defualt ones
export const HostHandler = (host: string) => {
  let url = new Url(host);
  const includesProtocol = host.includes("http") || host.includes("https");
  const includesOnlySlashes = host.includes("://") && !includesProtocol;

  if (!includesProtocol) url = new Url(`http://${host}`);
  if (includesOnlySlashes) url = new Url(`http${host}`);

  !url.port && url?.set("port", "8080");

  return url.origin;
};
