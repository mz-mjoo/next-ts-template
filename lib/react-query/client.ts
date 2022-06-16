import {AxiosError, AxiosResponse} from 'axios';
import {QueryClient, UseMutationOptions, UseQueryOptions} from 'react-query';

const queryClient = new QueryClient();

export const queryKeyStore = {};

export type MutationOption<TData, TError, Variable> = Omit<
  UseMutationOptions<AxiosResponse<TData>, AxiosError<TError>, Variable>,
  'mutationKey' | 'mutationFn'
>;

export type QueryOption<TQueryFnData, TError> = Omit<
  UseQueryOptions<
    AxiosResponse<TQueryFnData>,
    AxiosError<TError>,
    AxiosResponse<TQueryFnData>,
    string[]
  >,
  'queryKey' | 'queryFn'
>;

export default queryClient;
