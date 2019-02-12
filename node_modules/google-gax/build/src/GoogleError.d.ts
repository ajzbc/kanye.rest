import { status } from 'grpc';
export declare class GoogleError extends Error {
    code?: status;
    note?: string;
}
