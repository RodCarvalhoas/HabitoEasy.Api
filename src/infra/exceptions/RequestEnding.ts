import { HttpException, HttpStatus } from "@nestjs/common";
import RequestEndingBody from "./RequestEndingBody";

export default class RequestEnding extends HttpException {
    constructor(httpStatus: HttpStatus, body?: RequestEndingBody) {
      super(body, httpStatus);
    }
}