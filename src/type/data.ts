/* eslint-disable @typescript-eslint/naming-convention */
export type Abstract = {
  id: number;
  body: string;
  user_id: string;
  created_at: string;
};

export type NewAbstract = Pick<Abstract, "body">;
