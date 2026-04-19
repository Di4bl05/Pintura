export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      gallery_projects: {
        Row: {
          id: number;
          slug: string;
          service: "interior" | "exterior" | "cabinet" | "commercial" | "deck" | "pressure";
          location: string;
          title_es: string;
          title_en: string;
          description_es: string;
          description_en: string;
          intro_es: string;
          intro_en: string;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
      };
      gallery_images: {
        Row: {
          id: number;
          project_id: number;
          kind: "before_desktop" | "before_mobile" | "after_desktop" | "after_mobile";
          path: string;
          public_url: string | null;
          alt_es: string;
          alt_en: string;
          caption_es: string;
          caption_en: string;
          created_at: string;
        };
      };
      admin_profiles: {
        Row: {
          id: string;
          role: "admin";
          created_at: string;
        };
      };
    };
  };
}
