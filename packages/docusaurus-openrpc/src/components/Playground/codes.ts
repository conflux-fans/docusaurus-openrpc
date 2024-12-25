export interface CodeExample {
  name: string;
  getCode: (url: string, method: string) => string;
  language: string;
}

export const Curl: CodeExample = {
  name: "curl",
  getCode: (url: string, method: string) => `curl --request POST \\
     --url ${url} \\
     --header 'accept: application/json' \\
     --header 'content-type: application/json' \\
     --data '
{
  "id": 1,
  "jsonrpc": "2.0",
  "params": [
    "string"
  ],
  "method": "${method}"
}`,
  language: "javascript",
};

export default [Curl];
