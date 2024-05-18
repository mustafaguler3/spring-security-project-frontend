export class Server {
    public host:string = "http://localhost:8080";
    public client:string = "http://localhost:4200";
    public userPicture:string = `${this.host}/image/user`;
    public postPicture:string = `${this.host}/image/post`;
}
