import { NextApiRequest } from "next";

export type Override<T, S> = Omit<T, keyof S> & S;

export type CustomRequestBody<Req, BodyType> = Override<Req, {body: BodyType}>;
export type CustomRequestQuery<Req, QueryType> = Override<Request, {query: QueryType}>;

