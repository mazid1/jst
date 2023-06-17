export type ServerErrorData = {
  statusCode: number;
  message: string | string[];
  error?: string;
};

export type ServerError = {
  status: number;
  data: ServerErrorData;
};
