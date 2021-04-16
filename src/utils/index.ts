import { HTTP_CODES, RESPONSE_STATUS } from "../constants/index";

export function isLessThanAnHour(timestamp): Boolean {
  const ONE_HOUR = 60 * 60 * 1000;

  return Date.now() - timestamp < ONE_HOUR;
}

export function failAction(request, h, error) {
  return h
    .response({
      status: RESPONSE_STATUS.ERROR,
      message: error.output.payload.message,
    })
    .code(HTTP_CODES.BAD_REQUEST)
    .takeover();
}
