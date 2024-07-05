import type { TimeRange } from "./schemas";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
		public: {
			Tables: {
				admins: {
					Row: {
						created_at: string;
						id: number;
						user_id: string | null;
					};
					Insert: {
						created_at?: string;
						id?: number;
						user_id?: string | null;
					};
					Update: {
						created_at?: string;
						id?: number;
						user_id?: string | null;
					};
					Relationships: [
						{
							foreignKeyName: "admins_user_id_fkey";
							columns: ["user_id"];
							isOneToOne: false;
							referencedRelation: "users";
							referencedColumns: ["id"];
						},
					];
				};
				car_images: {
					Row: {
						car_id: number;
						created_at: string;
						id: number;
						image_url: string;
					};
					Insert: {
						car_id: number;
						created_at?: string;
						id?: number;
						image_url: string;
					};
					Update: {
						car_id?: number;
						created_at?: string;
						id?: number;
						image_url?: string;
					};
					Relationships: [
						{
							foreignKeyName: "car_images_car_id_fkey";
							columns: ["car_id"];
							isOneToOne: false;
							referencedRelation: "cars";
							referencedColumns: ["id"];
						},
					];
				};
				cars: {
					Row: {
						availability: boolean;
						description: string;
						id: number;
						license_plate: string;
						make: string;
						model: string;
						rental_price_per_hour: number;
						year: number;
					};
					Insert: {
						availability?: boolean;
						description: string;
						id?: number;
						license_plate: string;
						make: string;
						model: string;
						rental_price_per_hour: number;
						year: number;
					};
					Update: {
						availability?: boolean;
						description?: string;
						id?: number;
						license_plate?: string;
						make?: string;
						model?: string;
						rental_price_per_hour?: number;
						year?: number;
					};
					Relationships: [];
				};
				profiles: {
					Row: {
						email: string | null;
						first_name: string | null;
						id: string;
						last_name: string | null;
						phone: string | null;
						updated_at: string | null;
					};
					Insert: {
						email?: string | null;
						first_name?: string | null;
						id: string;
						last_name?: string | null;
						phone?: string | null;
						updated_at?: string | null;
					};
					Update: {
						email?: string | null;
						first_name?: string | null;
						id?: string;
						last_name?: string | null;
						phone?: string | null;
						updated_at?: string | null;
					};
					Relationships: [
						{
							foreignKeyName: "profiles_id_fkey";
							columns: ["id"];
							isOneToOne: true;
							referencedRelation: "users";
							referencedColumns: ["id"];
						},
					];
				};
				rentals: {
					Row: {
						booking_period: TimeRange;
						car_id: number;
						created_at: string;
						duration: number;
						id: number;
						notes: string | null;
						paid: boolean;
						payment_id: string | null;
						profile_id: string;
						status: Database["public"]["Enums"]["status"] | null;
						total_price: number;
					};
					Insert: {
						booking_period: TimeRange;
						car_id: number;
						created_at?: string;
						duration?: number;
						id?: number;
						notes?: string | null;
						paid?: boolean;
						payment_id?: string | null;
						profile_id: string;
						status?: Database["public"]["Enums"]["status"] | null;
						total_price: number;
					};
					Update: {
						booking_period?: TimeRange;
						car_id?: number;
						created_at?: string;
						duration?: number;
						id?: number;
						notes?: string | null;
						paid?: boolean;
						payment_id?: string | null;
						profile_id?: string;
						status?: Database["public"]["Enums"]["status"] | null;
						total_price?: number;
					};
					Relationships: [
						{
							foreignKeyName: "rentals_car_id_fkey";
							columns: ["car_id"];
							isOneToOne: false;
							referencedRelation: "cars";
							referencedColumns: ["id"];
						},
						{
							foreignKeyName: "rentals_profile_id_fkey";
							columns: ["profile_id"];
							isOneToOne: false;
							referencedRelation: "profiles";
							referencedColumns: ["id"];
						},
					];
				};
			};
			Views: {
				[_ in never]: never;
			};
			Functions: {
				gbt_bit_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_bool_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_bool_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_bpchar_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_bytea_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_cash_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_cash_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_date_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_date_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_decompress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_enum_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_enum_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_float4_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_float4_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_float8_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_float8_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_inet_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_int2_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_int2_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_int4_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_int4_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_int8_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_int8_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_intv_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_intv_decompress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_intv_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_macad_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_macad_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_macad8_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_macad8_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_numeric_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_oid_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_oid_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_text_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_time_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_time_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_timetz_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_ts_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_ts_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_tstz_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_uuid_compress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_uuid_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_var_decompress: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbt_var_fetch: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey_var_in: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey_var_out: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey16_in: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey16_out: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey2_in: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey2_out: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey32_in: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey32_out: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey4_in: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey4_out: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey8_in: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				gbtreekey8_out: {
					Args: {
						"": unknown;
					};
					Returns: unknown;
				};
				is_admin: {
					Args: Record<PropertyKey, never>;
					Returns: boolean;
				};
			};
			Enums: {
				status: "pending" | "confirmed" | "completed";
			};
			CompositeTypes: {
				[_ in never]: never;
			};
		};
	};

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
