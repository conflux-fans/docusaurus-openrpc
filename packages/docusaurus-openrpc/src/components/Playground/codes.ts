export interface CodeExample {
  name: string;
  getCode: (url: string, method: string, params: string[]) => string;
  language: string;
}

export const Curl: CodeExample = {
  name: "curl",
  getCode: (url, method, params = []) => `curl --request POST \\
     --url ${url} \\
     --header 'accept: application/json' \\
     --header 'content-type: application/json' \\
     --data '
{
  "id": 1,
  "jsonrpc": "2.0",
  "params": ${JSON.stringify(params)},
  "method": "${method}"
}'`,
  language: "javascript",
};

export default [Curl];
