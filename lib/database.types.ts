export type Database = {
  public: {
    tables: {
      users: {
        Row: {
          id: string;
          name: string;
          location: string;
          skills: string[];
        };
      };
      posts: {
        Row: {
          id: number;
          category: string;
          content: string;
          user_id: string;
          created_at: string;
        };
      };
    };
  };
}; 