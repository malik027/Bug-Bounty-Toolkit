export interface Command {
  name: string;
  command: string[]; // sekarang support multi-line
  description?: string;
}

export interface CommandCategory {
  id: string;
  title: string;
  commands: Command[];
}

export interface AdvancedMethodology {
  id: string;
  title: string;
  commands: Command[];
}

export interface Contributor {
  username: string;
  description?: string;
  imageUrl: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    youtube?: string;
    instagram?: string;
  };
}