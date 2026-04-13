export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bls_laus_county: {
        Row: {
          county_id: number
          created_at: string
          data_source: string | null
          employment: number | null
          id: number
          import_batch_id: string | null
          labor_force: number | null
          period: string | null
          series_ids: Json
          source_month: number
          source_year: number
          unemployment: number | null
          unemployment_rate: number | null
          updated_at: string
        }
        Insert: {
          county_id: number
          created_at?: string
          data_source?: string | null
          employment?: number | null
          id?: number
          import_batch_id?: string | null
          labor_force?: number | null
          period?: string | null
          series_ids?: Json
          source_month: number
          source_year: number
          unemployment?: number | null
          unemployment_rate?: number | null
          updated_at?: string
        }
        Update: {
          county_id?: number
          created_at?: string
          data_source?: string | null
          employment?: number | null
          id?: number
          import_batch_id?: string | null
          labor_force?: number | null
          period?: string | null
          series_ids?: Json
          source_month?: number
          source_year?: number
          unemployment?: number | null
          unemployment_rate?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      bls_qcew_county: {
        Row: {
          average_weekly_wage: number | null
          county_id: number
          created_at: string
          data_source: string | null
          employment: number | null
          establishments: number | null
          id: number
          import_batch_id: string | null
          industry_code: string
          is_annual_avg: boolean | null
          ownership_code: string
          qtr: string | null
          source_reference: string | null
          source_year: number
          total_annual_wages: number | null
          updated_at: string
        }
        Insert: {
          average_weekly_wage?: number | null
          county_id: number
          created_at?: string
          data_source?: string | null
          employment?: number | null
          establishments?: number | null
          id?: number
          import_batch_id?: string | null
          industry_code?: string
          is_annual_avg?: boolean | null
          ownership_code?: string
          qtr?: string | null
          source_reference?: string | null
          source_year: number
          total_annual_wages?: number | null
          updated_at?: string
        }
        Update: {
          average_weekly_wage?: number | null
          county_id?: number
          created_at?: string
          data_source?: string | null
          employment?: number | null
          establishments?: number | null
          id?: number
          import_batch_id?: string | null
          industry_code?: string
          is_annual_avg?: boolean | null
          ownership_code?: string
          qtr?: string | null
          source_reference?: string | null
          source_year?: number
          total_annual_wages?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      campaign_admins: {
        Row: {
          created_at: string
          invited_by: string | null
          label: string | null
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          invited_by?: string | null
          label?: string | null
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          invited_by?: string | null
          label?: string | null
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      campaign_events: {
        Row: {
          address: string | null
          audience: string | null
          created_at: string
          ends_at: string | null
          event_kind: string
          format_notes: string | null
          id: string
          is_demo: boolean
          location_label: string
          organizer_email: string
          organizer_name: string
          organizer_phone: string | null
          review_note: string | null
          review_status: string
          reviewed_at: string | null
          reviewed_by: string | null
          starts_at: string
          title: string
          ward_hint: string | null
        }
        Insert: {
          address?: string | null
          audience?: string | null
          created_at?: string
          ends_at?: string | null
          event_kind: string
          format_notes?: string | null
          id?: string
          is_demo?: boolean
          location_label: string
          organizer_email: string
          organizer_name: string
          organizer_phone?: string | null
          review_note?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          starts_at: string
          title: string
          ward_hint?: string | null
        }
        Update: {
          address?: string | null
          audience?: string | null
          created_at?: string
          ends_at?: string | null
          event_kind?: string
          format_notes?: string | null
          id?: string
          is_demo?: boolean
          location_label?: string
          organizer_email?: string
          organizer_name?: string
          organizer_phone?: string | null
          review_note?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          starts_at?: string
          title?: string
          ward_hint?: string | null
        }
        Relationships: []
      }
      canvass_contacts: {
        Row: {
          address1: string
          address2: string | null
          city: string | null
          contact_key: string | null
          county_id: number | null
          created_at: string
          do_not_contact: boolean
          email: string | null
          full_name: string | null
          household_id: string | null
          id: number
          phone: string | null
          preferred_language: string | null
          state: string | null
          turf_id: number | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          address1: string
          address2?: string | null
          city?: string | null
          contact_key?: string | null
          county_id?: number | null
          created_at?: string
          do_not_contact?: boolean
          email?: string | null
          full_name?: string | null
          household_id?: string | null
          id?: number
          phone?: string | null
          preferred_language?: string | null
          state?: string | null
          turf_id?: number | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address1?: string
          address2?: string | null
          city?: string | null
          contact_key?: string | null
          county_id?: number | null
          created_at?: string
          do_not_contact?: boolean
          email?: string | null
          full_name?: string | null
          household_id?: string | null
          id?: number
          phone?: string | null
          preferred_language?: string | null
          state?: string | null
          turf_id?: number | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "canvass_contacts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "canvass_contacts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "canvass_contacts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "canvass_contacts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "canvass_contacts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "canvass_contacts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "canvass_contacts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "canvass_contacts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "canvass_contacts_turf_id_fkey"
            columns: ["turf_id"]
            isOneToOne: false
            referencedRelation: "turfs"
            referencedColumns: ["id"]
          },
        ]
      }
      canvass_responses: {
        Row: {
          contact_id: number
          created_at: string
          id: number
          issues: Json | null
          note: string | null
          response_type: string
          sentiment: string | null
          session_id: number
          volunteer_id: number
          wants_event_invite: boolean
          wants_followup: boolean
          wants_volunteer_info: boolean
        }
        Insert: {
          contact_id: number
          created_at?: string
          id?: number
          issues?: Json | null
          note?: string | null
          response_type: string
          sentiment?: string | null
          session_id: number
          volunteer_id: number
          wants_event_invite?: boolean
          wants_followup?: boolean
          wants_volunteer_info?: boolean
        }
        Update: {
          contact_id?: number
          created_at?: string
          id?: number
          issues?: Json | null
          note?: string | null
          response_type?: string
          sentiment?: string | null
          session_id?: number
          volunteer_id?: number
          wants_event_invite?: boolean
          wants_followup?: boolean
          wants_volunteer_info?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "canvass_responses_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "canvass_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "canvass_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "canvass_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "canvass_responses_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      canvass_sessions: {
        Row: {
          checkin_location_text: string | null
          checkout_summary: string | null
          created_at: string
          ended_at: string | null
          id: number
          session_status: string
          started_at: string
          turf_id: number | null
          updated_at: string
          volunteer_id: number
        }
        Insert: {
          checkin_location_text?: string | null
          checkout_summary?: string | null
          created_at?: string
          ended_at?: string | null
          id?: number
          session_status?: string
          started_at?: string
          turf_id?: number | null
          updated_at?: string
          volunteer_id: number
        }
        Update: {
          checkin_location_text?: string | null
          checkout_summary?: string | null
          created_at?: string
          ended_at?: string | null
          id?: number
          session_status?: string
          started_at?: string
          turf_id?: number | null
          updated_at?: string
          volunteer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "canvass_sessions_turf_id_fkey"
            columns: ["turf_id"]
            isOneToOne: false
            referencedRelation: "turfs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "canvass_sessions_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      canvass_units: {
        Row: {
          address_full: string
          created_at: string
          id: string
          is_demo: boolean
          lat: number
          lng: number
          notes: string | null
          party: string | null
          precinct: string | null
          turf_tag: string | null
          voter_file_id: string | null
          voter_first: string | null
          voter_last: string | null
          ward_hint: string | null
        }
        Insert: {
          address_full: string
          created_at?: string
          id?: string
          is_demo?: boolean
          lat: number
          lng: number
          notes?: string | null
          party?: string | null
          precinct?: string | null
          turf_tag?: string | null
          voter_file_id?: string | null
          voter_first?: string | null
          voter_last?: string | null
          ward_hint?: string | null
        }
        Update: {
          address_full?: string
          created_at?: string
          id?: string
          is_demo?: boolean
          lat?: number
          lng?: number
          notes?: string | null
          party?: string | null
          precinct?: string | null
          turf_tag?: string | null
          voter_file_id?: string | null
          voter_first?: string | null
          voter_last?: string | null
          ward_hint?: string | null
        }
        Relationships: []
      }
      cd2_county_export: {
        Row: {
          acs_year: number | null
          black_pct: number | null
          black_population: number | null
          county_name: string | null
          district: string | null
          population_total: number | null
          registration_gap: number | null
          registration_rate: number | null
          snapshot_at: string | null
          voting_age_population: number | null
          vr_voters: number | null
        }
        Insert: {
          acs_year?: number | null
          black_pct?: number | null
          black_population?: number | null
          county_name?: string | null
          district?: string | null
          population_total?: number | null
          registration_gap?: number | null
          registration_rate?: number | null
          snapshot_at?: string | null
          voting_age_population?: number | null
          vr_voters?: number | null
        }
        Update: {
          acs_year?: number | null
          black_pct?: number | null
          black_population?: number | null
          county_name?: string | null
          district?: string | null
          population_total?: number | null
          registration_gap?: number | null
          registration_rate?: number | null
          snapshot_at?: string | null
          voting_age_population?: number | null
          vr_voters?: number | null
        }
        Relationships: []
      }
      census_county_acs: {
        Row: {
          asian_population: number | null
          bachelors_or_higher: number | null
          black_population: number | null
          county_id: number
          created_at: string
          data_source: string | null
          hispanic_population: number | null
          id: number
          import_batch_id: string | null
          median_household_income: number | null
          owner_occupied_housing: number | null
          poverty_population: number | null
          renter_occupied_housing: number | null
          source_year: number
          total_population: number | null
          updated_at: string
          voting_age_population: number | null
          white_population: number | null
        }
        Insert: {
          asian_population?: number | null
          bachelors_or_higher?: number | null
          black_population?: number | null
          county_id: number
          created_at?: string
          data_source?: string | null
          hispanic_population?: number | null
          id?: number
          import_batch_id?: string | null
          median_household_income?: number | null
          owner_occupied_housing?: number | null
          poverty_population?: number | null
          renter_occupied_housing?: number | null
          source_year: number
          total_population?: number | null
          updated_at?: string
          voting_age_population?: number | null
          white_population?: number | null
        }
        Update: {
          asian_population?: number | null
          bachelors_or_higher?: number | null
          black_population?: number | null
          county_id?: number
          created_at?: string
          data_source?: string | null
          hispanic_population?: number | null
          id?: number
          import_batch_id?: string | null
          median_household_income?: number | null
          owner_occupied_housing?: number | null
          poverty_population?: number | null
          renter_occupied_housing?: number | null
          source_year?: number
          total_population?: number | null
          updated_at?: string
          voting_age_population?: number | null
          white_population?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "census_county_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_county_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_county_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_county_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_county_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_county_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "census_county_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_county_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      census_place_acs: {
        Row: {
          asian_population: number | null
          bachelors_or_higher: number | null
          black_population: number | null
          created_at: string
          data_source: string | null
          geo_city_id: number | null
          hispanic_population: number | null
          id: number
          import_batch_id: string | null
          median_household_income: number | null
          owner_occupied_housing: number | null
          place_fips: string
          poverty_population: number | null
          renter_occupied_housing: number | null
          source_year: number
          state_fips: string
          total_population: number | null
          updated_at: string
          voting_age_population: number | null
          white_population: number | null
        }
        Insert: {
          asian_population?: number | null
          bachelors_or_higher?: number | null
          black_population?: number | null
          created_at?: string
          data_source?: string | null
          geo_city_id?: number | null
          hispanic_population?: number | null
          id?: number
          import_batch_id?: string | null
          median_household_income?: number | null
          owner_occupied_housing?: number | null
          place_fips: string
          poverty_population?: number | null
          renter_occupied_housing?: number | null
          source_year: number
          state_fips: string
          total_population?: number | null
          updated_at?: string
          voting_age_population?: number | null
          white_population?: number | null
        }
        Update: {
          asian_population?: number | null
          bachelors_or_higher?: number | null
          black_population?: number | null
          created_at?: string
          data_source?: string | null
          geo_city_id?: number | null
          hispanic_population?: number | null
          id?: number
          import_batch_id?: string | null
          median_household_income?: number | null
          owner_occupied_housing?: number | null
          place_fips?: string
          poverty_population?: number | null
          renter_occupied_housing?: number | null
          source_year?: number
          state_fips?: string
          total_population?: number | null
          updated_at?: string
          voting_age_population?: number | null
          white_population?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "census_place_acs_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "census_place_acs_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: false
            referencedRelation: "geo_cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "census_place_acs_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: false
            referencedRelation: "geo_city_primary_county_v"
            referencedColumns: ["geo_city_id"]
          },
          {
            foreignKeyName: "census_place_acs_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: false
            referencedRelation: "statewide_city_master_v"
            referencedColumns: ["city_id"]
          },
        ]
      }
      census_tract_acs: {
        Row: {
          county_id: number
          created_at: string
          data_source: string | null
          geoid: string
          id: number
          import_batch_id: string | null
          median_household_income: number | null
          poverty_population: number | null
          source_year: number
          total_population: number | null
          tract_code: string
          updated_at: string
        }
        Insert: {
          county_id: number
          created_at?: string
          data_source?: string | null
          geoid: string
          id?: number
          import_batch_id?: string | null
          median_household_income?: number | null
          poverty_population?: number | null
          source_year: number
          total_population?: number | null
          tract_code: string
          updated_at?: string
        }
        Update: {
          county_id?: number
          created_at?: string
          data_source?: string | null
          geoid?: string
          id?: number
          import_batch_id?: string | null
          median_household_income?: number | null
          poverty_population?: number | null
          source_year?: number
          total_population?: number | null
          tract_code?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "census_tract_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_tract_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_tract_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_tract_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_tract_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_tract_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "census_tract_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "census_tract_acs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      city_election_results: {
        Row: {
          candidate_name: string
          city_id: number
          created_at: string
          data_source: string | null
          id: number
          import_batch_id: string | null
          party: string | null
          race_id: number
          updated_at: string
          votes: number
        }
        Insert: {
          candidate_name: string
          city_id: number
          created_at?: string
          data_source?: string | null
          id?: number
          import_batch_id?: string | null
          party?: string | null
          race_id: number
          updated_at?: string
          votes?: number
        }
        Update: {
          candidate_name?: string
          city_id?: number
          created_at?: string
          data_source?: string | null
          id?: number
          import_batch_id?: string | null
          party?: string | null
          race_id?: number
          updated_at?: string
          votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "city_election_results_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "city_election_results_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "geo_cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_election_results_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "geo_city_primary_county_v"
            referencedColumns: ["geo_city_id"]
          },
          {
            foreignKeyName: "city_election_results_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "statewide_city_master_v"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "city_election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "city_election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "city_election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      city_election_turnout: {
        Row: {
          ballots_cast: number | null
          city_id: number
          created_at: string
          data_source: string | null
          election_id: number
          id: number
          import_batch_id: string | null
          registered_voters: number | null
          updated_at: string
        }
        Insert: {
          ballots_cast?: number | null
          city_id: number
          created_at?: string
          data_source?: string | null
          election_id: number
          id?: number
          import_batch_id?: string | null
          registered_voters?: number | null
          updated_at?: string
        }
        Update: {
          ballots_cast?: number | null
          city_id?: number
          created_at?: string
          data_source?: string | null
          election_id?: number
          id?: number
          import_batch_id?: string | null
          registered_voters?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_election_turnout_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "city_election_turnout_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "geo_cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_election_turnout_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "geo_city_primary_county_v"
            referencedColumns: ["geo_city_id"]
          },
          {
            foreignKeyName: "city_election_turnout_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "statewide_city_master_v"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "city_election_turnout_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_agent_onboarding: {
        Row: {
          agent_routing_notes: string | null
          campaign_philosophy: string | null
          constraints: string | null
          created_at: string
          created_by: string | null
          decision_rules: string | null
          focuses: string | null
          id: number
          preferred_checkin_cadence: string | null
          priorities_json: Json | null
          style_guide: string | null
          updated_at: string
          weekly_hours_available: number | null
        }
        Insert: {
          agent_routing_notes?: string | null
          campaign_philosophy?: string | null
          constraints?: string | null
          created_at?: string
          created_by?: string | null
          decision_rules?: string | null
          focuses?: string | null
          id?: number
          preferred_checkin_cadence?: string | null
          priorities_json?: Json | null
          style_guide?: string | null
          updated_at?: string
          weekly_hours_available?: number | null
        }
        Update: {
          agent_routing_notes?: string | null
          campaign_philosophy?: string | null
          constraints?: string | null
          created_at?: string
          created_by?: string | null
          decision_rules?: string | null
          focuses?: string | null
          id?: number
          preferred_checkin_cadence?: string | null
          priorities_json?: Json | null
          style_guide?: string | null
          updated_at?: string
          weekly_hours_available?: number | null
        }
        Relationships: []
      }
      comms_queue: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          block_reason: string | null
          body: string
          channel: string
          compliance_message_log_id: number | null
          created_at: string
          created_by: string | null
          id: number
          person_id: string
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          status: string
          subject: string | null
          submitted_at: string | null
          template_key: string | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          block_reason?: string | null
          body: string
          channel: string
          compliance_message_log_id?: number | null
          created_at?: string
          created_by?: string | null
          id?: number
          person_id: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
          subject?: string | null
          submitted_at?: string | null
          template_key?: string | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          block_reason?: string | null
          body?: string
          channel?: string
          compliance_message_log_id?: number | null
          created_at?: string
          created_by?: string | null
          id?: number
          person_id?: string
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          status?: string
          subject?: string | null
          submitted_at?: string | null
          template_key?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comms_queue_compliance_message_log_id_fkey"
            columns: ["compliance_message_log_id"]
            isOneToOne: false
            referencedRelation: "compliance_message_log"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comms_queue_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "comms_queue_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comms_queue_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      comms_templates: {
        Row: {
          body: string
          channel: string
          created_at: string
          id: number
          is_active: boolean
          name: string
          subject: string | null
          template_key: string
          updated_at: string
        }
        Insert: {
          body: string
          channel?: string
          created_at?: string
          id?: number
          is_active?: boolean
          name: string
          subject?: string | null
          template_key: string
          updated_at?: string
        }
        Update: {
          body?: string
          channel?: string
          created_at?: string
          id?: number
          is_active?: boolean
          name?: string
          subject?: string | null
          template_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      comms_webhook_events: {
        Row: {
          created_at: string
          error: string | null
          event_type: string | null
          id: number
          payload: Json
          processed_at: string | null
          provider: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          event_type?: string | null
          id?: number
          payload?: Json
          processed_at?: string | null
          provider: string
        }
        Update: {
          created_at?: string
          error?: string | null
          event_type?: string | null
          id?: number
          payload?: Json
          processed_at?: string | null
          provider?: string
        }
        Relationships: []
      }
      compliance_access_log: {
        Row: {
          action: string
          actor: string | null
          created_at: string
          id: number
          ip: string | null
          metadata: Json | null
          object_id: string | null
          object_type: string
          reason: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor?: string | null
          created_at?: string
          id?: number
          ip?: string | null
          metadata?: Json | null
          object_id?: string | null
          object_type: string
          reason?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor?: string | null
          created_at?: string
          id?: number
          ip?: string | null
          metadata?: Json | null
          object_id?: string | null
          object_type?: string
          reason?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      compliance_consent_events: {
        Row: {
          channel: string
          consent_status: string
          contact_type: string
          contact_value: string | null
          contact_value_sha256: string | null
          created_at: string
          evidence: string | null
          id: number
          occurred_at: string
          person_id: string | null
          source: string
        }
        Insert: {
          channel: string
          consent_status: string
          contact_type: string
          contact_value?: string | null
          contact_value_sha256?: string | null
          created_at?: string
          evidence?: string | null
          id?: number
          occurred_at?: string
          person_id?: string | null
          source?: string
        }
        Update: {
          channel?: string
          consent_status?: string
          contact_type?: string
          contact_value?: string | null
          contact_value_sha256?: string | null
          created_at?: string
          evidence?: string | null
          id?: number
          occurred_at?: string
          person_id?: string | null
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_consent_events_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "compliance_consent_events_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_consent_events_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      compliance_message_log: {
        Row: {
          body_preview: string | null
          channel: string
          comms_queue_id: number | null
          created_at: string
          delivered_at: string | null
          error: string | null
          id: number
          person_id: string | null
          provider: string | null
          provider_message_id: string | null
          sent_at: string | null
          status: string
          subject: string | null
          template_key: string | null
          to_value: string | null
          to_value_sha256: string | null
        }
        Insert: {
          body_preview?: string | null
          channel: string
          comms_queue_id?: number | null
          created_at?: string
          delivered_at?: string | null
          error?: string | null
          id?: number
          person_id?: string | null
          provider?: string | null
          provider_message_id?: string | null
          sent_at?: string | null
          status?: string
          subject?: string | null
          template_key?: string | null
          to_value?: string | null
          to_value_sha256?: string | null
        }
        Update: {
          body_preview?: string | null
          channel?: string
          comms_queue_id?: number | null
          created_at?: string
          delivered_at?: string | null
          error?: string | null
          id?: number
          person_id?: string | null
          provider?: string | null
          provider_message_id?: string | null
          sent_at?: string | null
          status?: string
          subject?: string | null
          template_key?: string | null
          to_value?: string | null
          to_value_sha256?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_message_log_comms_queue_id_fkey"
            columns: ["comms_queue_id"]
            isOneToOne: false
            referencedRelation: "comms_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_message_log_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "compliance_message_log_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_message_log_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      compliance_suppressions: {
        Row: {
          channel: string
          contact_type: string
          contact_value: string | null
          contact_value_sha256: string | null
          created_at: string
          ends_at: string | null
          id: number
          note: string | null
          person_id: string | null
          starts_at: string
          suppression_reason: string
          suppression_source: string
          updated_at: string
        }
        Insert: {
          channel: string
          contact_type: string
          contact_value?: string | null
          contact_value_sha256?: string | null
          created_at?: string
          ends_at?: string | null
          id?: number
          note?: string | null
          person_id?: string | null
          starts_at?: string
          suppression_reason: string
          suppression_source?: string
          updated_at?: string
        }
        Update: {
          channel?: string
          contact_type?: string
          contact_value?: string | null
          contact_value_sha256?: string | null
          created_at?: string
          ends_at?: string | null
          id?: number
          note?: string | null
          person_id?: string | null
          starts_at?: string
          suppression_reason?: string
          suppression_source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_suppressions_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "compliance_suppressions_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_suppressions_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      county_cd_map: {
        Row: {
          congressional_district: string | null
          county_id: number | null
        }
        Insert: {
          congressional_district?: string | null
          county_id?: number | null
        }
        Update: {
          congressional_district?: string | null
          county_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "county_cd_map_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_cd_map_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_cd_map_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_cd_map_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_cd_map_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_cd_map_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "county_cd_map_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_cd_map_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      county_congressional_districts: {
        Row: {
          congressional_district: string
          county_id: number
          created_at: string | null
          map_effective_year: number | null
          notes: string | null
          state_fips: string | null
        }
        Insert: {
          congressional_district: string
          county_id: number
          created_at?: string | null
          map_effective_year?: number | null
          notes?: string | null
          state_fips?: string | null
        }
        Update: {
          congressional_district?: string
          county_id?: number
          created_at?: string | null
          map_effective_year?: number | null
          notes?: string | null
          state_fips?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "county_congressional_districts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_congressional_districts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_congressional_districts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_congressional_districts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_congressional_districts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_congressional_districts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "county_congressional_districts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_congressional_districts_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      county_election_results: {
        Row: {
          candidate_name: string
          county_id: number
          created_at: string
          data_source: string | null
          id: number
          import_batch_id: string | null
          party: string | null
          race_id: number
          source_file_name: string | null
          updated_at: string
          votes: number
        }
        Insert: {
          candidate_name: string
          county_id: number
          created_at?: string
          data_source?: string | null
          id?: number
          import_batch_id?: string | null
          party?: string | null
          race_id: number
          source_file_name?: string | null
          updated_at?: string
          votes?: number
        }
        Update: {
          candidate_name?: string
          county_id?: number
          created_at?: string
          data_source?: string | null
          id?: number
          import_batch_id?: string | null
          party?: string | null
          race_id?: number
          source_file_name?: string | null
          updated_at?: string
          votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "county_election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "county_election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "county_election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "county_election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      county_election_turnout: {
        Row: {
          ballots_cast: number | null
          county_id: number
          created_at: string
          data_source: string | null
          election_id: number
          id: number
          import_batch_id: string | null
          registered_voters: number | null
          updated_at: string
        }
        Insert: {
          ballots_cast?: number | null
          county_id: number
          created_at?: string
          data_source?: string | null
          election_id: number
          id?: number
          import_batch_id?: string | null
          registered_voters?: number | null
          updated_at?: string
        }
        Update: {
          ballots_cast?: number | null
          county_id?: number
          created_at?: string
          data_source?: string | null
          election_id?: number
          id?: number
          import_batch_id?: string | null
          registered_voters?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "county_election_turnout_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_turnout_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_turnout_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_turnout_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_turnout_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_turnout_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "county_election_turnout_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_turnout_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "county_election_turnout_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      deliverability_threshold_configs: {
        Row: {
          active: boolean
          channel: string
          created_at: string
          critical_value: number | null
          id: string
          threshold_key: string
          updated_at: string
          warning_value: number | null
        }
        Insert: {
          active?: boolean
          channel: string
          created_at?: string
          critical_value?: number | null
          id?: string
          threshold_key: string
          updated_at?: string
          warning_value?: number | null
        }
        Update: {
          active?: boolean
          channel?: string
          created_at?: string
          critical_value?: number | null
          id?: string
          threshold_key?: string
          updated_at?: string
          warning_value?: number | null
        }
        Relationships: []
      }
      election_contests: {
        Row: {
          contest_name: string | null
          created_at: string | null
          district: string | null
          election_id: number | null
          election_name: string | null
          election_type: string | null
          election_year: number | null
          id: number
          import_batch: string | null
          office_name: string | null
          party: string | null
          provider_contest_id: string | null
          race_id: number | null
          source_file_name: string | null
          updated_at: string | null
        }
        Insert: {
          contest_name?: string | null
          created_at?: string | null
          district?: string | null
          election_id?: number | null
          election_name?: string | null
          election_type?: string | null
          election_year?: number | null
          id?: number
          import_batch?: string | null
          office_name?: string | null
          party?: string | null
          provider_contest_id?: string | null
          race_id?: number | null
          source_file_name?: string | null
          updated_at?: string | null
        }
        Update: {
          contest_name?: string | null
          created_at?: string | null
          district?: string | null
          election_id?: number | null
          election_name?: string | null
          election_type?: string | null
          election_year?: number | null
          id?: number
          import_batch?: string | null
          office_name?: string | null
          party?: string | null
          provider_contest_id?: string | null
          race_id?: number | null
          source_file_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "election_contests_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "election_contests_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_contests_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_contests_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      election_import_log: {
        Row: {
          created_at: string
          data_source: string | null
          election_key: string | null
          id: number
          import_batch_id: string | null
          message: string | null
          rows_inserted: number
          rows_read: number
          rows_skipped: number
          source_file: string
        }
        Insert: {
          created_at?: string
          data_source?: string | null
          election_key?: string | null
          id?: number
          import_batch_id?: string | null
          message?: string | null
          rows_inserted?: number
          rows_read?: number
          rows_skipped?: number
          source_file: string
        }
        Update: {
          created_at?: string
          data_source?: string | null
          election_key?: string | null
          id?: number
          import_batch_id?: string | null
          message?: string | null
          rows_inserted?: number
          rows_read?: number
          rows_skipped?: number
          source_file?: string
        }
        Relationships: []
      }
      election_results: {
        Row: {
          candidate_name: string | null
          contest_id: number | null
          county: string | null
          county_id: number | null
          created_at: string | null
          geography_type: string
          id: number
          location_label: string | null
          location_raw: string | null
          party: string | null
          precinct: string | null
          race_id: number | null
          reporting_district_code: string | null
          reporting_district_type: string | null
          result_scope: string | null
          row_payload: Json | null
          source_file_name: string | null
          source_precinct_code: string | null
          source_precinct_name: string | null
          total_votes_at_location: number | null
          updated_at: string | null
          vote_pct: number | null
          vote_share_pct: number | null
          vote_total: number | null
          votes: number | null
        }
        Insert: {
          candidate_name?: string | null
          contest_id?: number | null
          county?: string | null
          county_id?: number | null
          created_at?: string | null
          geography_type: string
          id?: number
          location_label?: string | null
          location_raw?: string | null
          party?: string | null
          precinct?: string | null
          race_id?: number | null
          reporting_district_code?: string | null
          reporting_district_type?: string | null
          result_scope?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          source_precinct_code?: string | null
          source_precinct_name?: string | null
          total_votes_at_location?: number | null
          updated_at?: string | null
          vote_pct?: number | null
          vote_share_pct?: number | null
          vote_total?: number | null
          votes?: number | null
        }
        Update: {
          candidate_name?: string | null
          contest_id?: number | null
          county?: string | null
          county_id?: number | null
          created_at?: string | null
          geography_type?: string
          id?: number
          location_label?: string | null
          location_raw?: string | null
          party?: string | null
          precinct?: string | null
          race_id?: number | null
          reporting_district_code?: string | null
          reporting_district_type?: string | null
          result_scope?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          source_precinct_code?: string | null
          source_precinct_name?: string | null
          total_votes_at_location?: number | null
          updated_at?: string | null
          vote_pct?: number | null
          vote_share_pct?: number | null
          vote_total?: number | null
          votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "election_results_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "election_contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      elections: {
        Row: {
          created_at: string
          description: string | null
          election_date: string | null
          election_key: string
          election_type: string
          election_year: number
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          election_date?: string | null
          election_key: string
          election_type: string
          election_year: number
          id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          election_date?: string | null
          election_key?: string
          election_type?: string
          election_year?: number
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      event_approvals: {
        Row: {
          action: string
          actor: string | null
          created_at: string
          event_id: number
          id: number
          reason: string | null
        }
        Insert: {
          action: string
          actor?: string | null
          created_at?: string
          event_id: number
          id?: number
          reason?: string | null
        }
        Update: {
          action?: string
          actor?: string | null
          created_at?: string
          event_id?: number
          id?: number
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_approvals_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          county_id: number | null
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string | null
          event_status: string
          geo_city_id: number | null
          id: number
          is_published: boolean
          location_address: string | null
          location_name: string | null
          location_notes: string | null
          precinct_label: string | null
          rejected_at: string | null
          rejected_by: string | null
          rejection_reason: string | null
          scope_level: string
          starts_at: string
          submitted_at: string | null
          timezone: string | null
          title: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          county_id?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          event_status?: string
          geo_city_id?: number | null
          id?: number
          is_published?: boolean
          location_address?: string | null
          location_name?: string | null
          location_notes?: string | null
          precinct_label?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          scope_level: string
          starts_at: string
          submitted_at?: string | null
          timezone?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          county_id?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          event_status?: string
          geo_city_id?: number | null
          id?: number
          is_published?: boolean
          location_address?: string | null
          location_name?: string | null
          location_notes?: string | null
          precinct_label?: string | null
          rejected_at?: string | null
          rejected_by?: string | null
          rejection_reason?: string | null
          scope_level?: string
          starts_at?: string
          submitted_at?: string | null
          timezone?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "events_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "events_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "events_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "events_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "events_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "events_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "events_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "events_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: false
            referencedRelation: "geo_cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: false
            referencedRelation: "geo_city_primary_county_v"
            referencedColumns: ["geo_city_id"]
          },
          {
            foreignKeyName: "events_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: false
            referencedRelation: "statewide_city_master_v"
            referencedColumns: ["city_id"]
          },
        ]
      }
      field_data_quality_flags: {
        Row: {
          contact_id: number | null
          created_at: string
          details: Json | null
          flag_type: string
          id: number
          session_id: number | null
          severity: string
          volunteer_id: number | null
        }
        Insert: {
          contact_id?: number | null
          created_at?: string
          details?: Json | null
          flag_type: string
          id?: number
          session_id?: number | null
          severity?: string
          volunteer_id?: number | null
        }
        Update: {
          contact_id?: number | null
          created_at?: string
          details?: Json | null
          flag_type?: string
          id?: number
          session_id?: number | null
          severity?: string
          volunteer_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "field_data_quality_flags_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "canvass_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_data_quality_flags_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "canvass_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_data_quality_flags_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      field_followups: {
        Row: {
          assigned_to: string | null
          contact_id: number
          created_at: string
          created_by_volunteer_id: number
          due_at: string | null
          followup_type: string
          id: number
          note: string | null
          priority: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          contact_id: number
          created_at?: string
          created_by_volunteer_id: number
          due_at?: string | null
          followup_type: string
          id?: number
          note?: string | null
          priority?: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          contact_id?: number
          created_at?: string
          created_by_volunteer_id?: number
          due_at?: string | null
          followup_type?: string
          id?: number
          note?: string | null
          priority?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "field_followups_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "canvass_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_followups_created_by_volunteer_id_fkey"
            columns: ["created_by_volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      field_notes: {
        Row: {
          contact_id: number
          created_at: string
          id: number
          note: string
          tags: Json | null
          volunteer_id: number
        }
        Insert: {
          contact_id: number
          created_at?: string
          id?: number
          note: string
          tags?: Json | null
          volunteer_id: number
        }
        Update: {
          contact_id?: number
          created_at?: string
          id?: number
          note?: string
          tags?: Json | null
          volunteer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "field_notes_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "canvass_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_notes_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      field_sync_events: {
        Row: {
          created_at: string
          device_id: string | null
          error: string | null
          id: number
          pending_count: number | null
          status: string
          volunteer_id: number
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          error?: string | null
          id?: number
          pending_count?: number | null
          status: string
          volunteer_id: number
        }
        Update: {
          created_at?: string
          device_id?: string | null
          error?: string | null
          id?: number
          pending_count?: number | null
          status?: string
          volunteer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "field_sync_events_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      geo_cities: {
        Row: {
          city_key: string
          city_name: string
          county_id: number | null
          created_at: string
          id: number
          place_fips: string
          state_fips: string
          updated_at: string
        }
        Insert: {
          city_key: string
          city_name: string
          county_id?: number | null
          created_at?: string
          id?: number
          place_fips: string
          state_fips: string
          updated_at?: string
        }
        Update: {
          city_key?: string
          city_name?: string
          county_id?: number | null
          created_at?: string
          id?: number
          place_fips?: string
          state_fips?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "geo_cities_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_cities_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_cities_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_cities_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_cities_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_cities_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "geo_cities_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_cities_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      geo_city_primary_county_overrides: {
        Row: {
          county_id: number
          created_at: string
          geo_city_id: number
          id: number
          notes: string | null
          updated_at: string
        }
        Insert: {
          county_id: number
          created_at?: string
          geo_city_id: number
          id?: number
          notes?: string | null
          updated_at?: string
        }
        Update: {
          county_id?: number
          created_at?: string
          geo_city_id?: number
          id?: number
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "geo_city_primary_county_overrides_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: true
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: true
            referencedRelation: "geo_cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: true
            referencedRelation: "geo_city_primary_county_v"
            referencedColumns: ["geo_city_id"]
          },
          {
            foreignKeyName: "geo_city_primary_county_overrides_geo_city_id_fkey"
            columns: ["geo_city_id"]
            isOneToOne: true
            referencedRelation: "statewide_city_master_v"
            referencedColumns: ["city_id"]
          },
        ]
      }
      geo_counties: {
        Row: {
          county_fips: string
          county_key: string
          county_name: string
          created_at: string
          id: number
          normalized_county_name: string | null
          state_fips: string
          updated_at: string
        }
        Insert: {
          county_fips: string
          county_key: string
          county_name: string
          created_at?: string
          id?: number
          normalized_county_name?: string | null
          state_fips: string
          updated_at?: string
        }
        Update: {
          county_fips?: string
          county_key?: string
          county_name?: string
          created_at?: string
          id?: number
          normalized_county_name?: string | null
          state_fips?: string
          updated_at?: string
        }
        Relationships: []
      }
      geo_county_aliases: {
        Row: {
          county_id: number
          created_at: string
          id: number
          normalized_raw_name: string | null
          raw_name: string
          source_system: string
        }
        Insert: {
          county_id: number
          created_at?: string
          id?: number
          normalized_raw_name?: string | null
          raw_name: string
          source_system: string
        }
        Update: {
          county_id?: number
          created_at?: string
          id?: number
          normalized_raw_name?: string | null
          raw_name?: string
          source_system?: string
        }
        Relationships: [
          {
            foreignKeyName: "geo_county_aliases_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_county_aliases_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_county_aliases_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_county_aliases_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_county_aliases_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_county_aliases_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "geo_county_aliases_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "geo_county_aliases_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      outreach_queue: {
        Row: {
          admin_note: string | null
          channel: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          message_body: string
          message_subject: string | null
          organizer_id: string
          reach_out_list_item_id: string | null
          sent_at: string | null
          sent_by: string | null
          status: string
        }
        Insert: {
          admin_note?: string | null
          channel: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          message_body: string
          message_subject?: string | null
          organizer_id: string
          reach_out_list_item_id?: string | null
          sent_at?: string | null
          sent_by?: string | null
          status?: string
        }
        Update: {
          admin_note?: string | null
          channel?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          message_body?: string
          message_subject?: string | null
          organizer_id?: string
          reach_out_list_item_id?: string | null
          sent_at?: string | null
          sent_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "outreach_queue_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "ward_organizers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_queue_reach_out_list_item_id_fkey"
            columns: ["reach_out_list_item_id"]
            isOneToOne: false
            referencedRelation: "reach_out_list_items"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          birth_year: number | null
          created_at: string
          date_of_birth: string | null
          display_name: string | null
          first_name: string | null
          gender: string | null
          id: string
          is_donor: boolean
          is_supporter: boolean
          is_volunteer: boolean
          is_voter: boolean
          language_preference: string | null
          last_name: string | null
          middle_name: string | null
          preferred_name: string | null
          primary_city: string | null
          primary_county_id: number | null
          primary_precinct_label: string | null
          primary_state: string | null
          primary_zip5: string | null
          source_confidence_score: number | null
          status: string
          suffix: string | null
          updated_at: string
        }
        Insert: {
          birth_year?: number | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          is_donor?: boolean
          is_supporter?: boolean
          is_volunteer?: boolean
          is_voter?: boolean
          language_preference?: string | null
          last_name?: string | null
          middle_name?: string | null
          preferred_name?: string | null
          primary_city?: string | null
          primary_county_id?: number | null
          primary_precinct_label?: string | null
          primary_state?: string | null
          primary_zip5?: string | null
          source_confidence_score?: number | null
          status?: string
          suffix?: string | null
          updated_at?: string
        }
        Update: {
          birth_year?: number | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          is_donor?: boolean
          is_supporter?: boolean
          is_volunteer?: boolean
          is_voter?: boolean
          language_preference?: string | null
          last_name?: string | null
          middle_name?: string | null
          preferred_name?: string | null
          primary_city?: string | null
          primary_county_id?: number | null
          primary_precinct_label?: string | null
          primary_state?: string | null
          primary_zip5?: string | null
          source_confidence_score?: number | null
          status?: string
          suffix?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      person_activity: {
        Row: {
          activity_ref_id: string | null
          activity_source: string | null
          activity_type: string
          county_id: number | null
          created_at: string
          id: string
          metadata: Json | null
          occurred_at: string
          person_id: string
        }
        Insert: {
          activity_ref_id?: string | null
          activity_source?: string | null
          activity_type: string
          county_id?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          occurred_at: string
          person_id: string
        }
        Update: {
          activity_ref_id?: string | null
          activity_source?: string | null
          activity_type?: string
          county_id?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          occurred_at?: string
          person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_activity_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_activity_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_activity_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_addresses: {
        Row: {
          address_type: string
          city: string | null
          county_id: number | null
          created_at: string
          house_number: string | null
          id: string
          is_current: boolean
          is_primary: boolean
          latitude: number | null
          longitude: number | null
          person_id: string
          precinct_label: string | null
          source_system: string | null
          state: string | null
          street_name: string | null
          unit: string | null
          updated_at: string
          zip4: string | null
          zip5: string | null
        }
        Insert: {
          address_type?: string
          city?: string | null
          county_id?: number | null
          created_at?: string
          house_number?: string | null
          id?: string
          is_current?: boolean
          is_primary?: boolean
          latitude?: number | null
          longitude?: number | null
          person_id: string
          precinct_label?: string | null
          source_system?: string | null
          state?: string | null
          street_name?: string | null
          unit?: string | null
          updated_at?: string
          zip4?: string | null
          zip5?: string | null
        }
        Update: {
          address_type?: string
          city?: string | null
          county_id?: number | null
          created_at?: string
          house_number?: string | null
          id?: string
          is_current?: boolean
          is_primary?: boolean
          latitude?: number | null
          longitude?: number | null
          person_id?: string
          precinct_label?: string | null
          source_system?: string | null
          state?: string | null
          street_name?: string | null
          unit?: string | null
          updated_at?: string
          zip4?: string | null
          zip5?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "person_addresses_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_addresses_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_addresses_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_addresses_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_addresses_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_addresses_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_addresses_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_addresses_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "person_addresses_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_addresses_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_addresses_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_contact_methods: {
        Row: {
          can_call: boolean
          can_email: boolean
          can_text: boolean
          consent_source: string | null
          consent_status: string
          consent_updated_at: string | null
          contact_normalized: string | null
          contact_type: string
          contact_value: string
          created_at: string
          id: string
          is_primary: boolean
          is_verified: boolean
          person_id: string
          updated_at: string
        }
        Insert: {
          can_call?: boolean
          can_email?: boolean
          can_text?: boolean
          consent_source?: string | null
          consent_status?: string
          consent_updated_at?: string | null
          contact_normalized?: string | null
          contact_type: string
          contact_value: string
          created_at?: string
          id?: string
          is_primary?: boolean
          is_verified?: boolean
          person_id: string
          updated_at?: string
        }
        Update: {
          can_call?: boolean
          can_email?: boolean
          can_text?: boolean
          consent_source?: string | null
          consent_status?: string
          consent_updated_at?: string | null
          contact_normalized?: string | null
          contact_type?: string
          contact_value?: string
          created_at?: string
          id?: string
          is_primary?: boolean
          is_verified?: boolean
          person_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_contact_methods_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_contact_methods_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_contact_methods_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_identifiers: {
        Row: {
          created_at: string
          id: string
          identifier_normalized: string | null
          identifier_type: string
          identifier_value: string
          is_primary: boolean
          is_verified: boolean
          person_id: string
          source_system: string
        }
        Insert: {
          created_at?: string
          id?: string
          identifier_normalized?: string | null
          identifier_type: string
          identifier_value: string
          is_primary?: boolean
          is_verified?: boolean
          person_id: string
          source_system: string
        }
        Update: {
          created_at?: string
          id?: string
          identifier_normalized?: string | null
          identifier_type?: string
          identifier_value?: string
          is_primary?: boolean
          is_verified?: boolean
          person_id?: string
          source_system?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_identifiers_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_identifiers_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_identifiers_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_match_candidates: {
        Row: {
          created_at: string
          id: string
          left_source_record_key: string
          left_source_system: string
          left_source_table: string
          match_reasons: Json
          match_score: number
          match_status: string
          reviewed_at: string | null
          reviewed_by: string | null
          right_source_record_key: string
          right_source_system: string
          right_source_table: string
          suggested_person_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          left_source_record_key: string
          left_source_system: string
          left_source_table: string
          match_reasons: Json
          match_score: number
          match_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          right_source_record_key: string
          right_source_system: string
          right_source_table: string
          suggested_person_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          left_source_record_key?: string
          left_source_system?: string
          left_source_table?: string
          match_reasons?: Json
          match_score?: number
          match_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          right_source_record_key?: string
          right_source_system?: string
          right_source_table?: string
          suggested_person_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "person_match_candidates_suggested_person_id_fkey"
            columns: ["suggested_person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_match_candidates_suggested_person_id_fkey"
            columns: ["suggested_person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_match_candidates_suggested_person_id_fkey"
            columns: ["suggested_person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_merge_log: {
        Row: {
          id: string
          merge_details: Json | null
          merge_reason: string | null
          merge_strategy: string | null
          merged_at: string
          merged_by: string | null
          merged_person_id: string
          surviving_person_id: string
        }
        Insert: {
          id?: string
          merge_details?: Json | null
          merge_reason?: string | null
          merge_strategy?: string | null
          merged_at?: string
          merged_by?: string | null
          merged_person_id: string
          surviving_person_id: string
        }
        Update: {
          id?: string
          merge_details?: Json | null
          merge_reason?: string | null
          merge_strategy?: string | null
          merged_at?: string
          merged_by?: string | null
          merged_person_id?: string
          surviving_person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_merge_log_surviving_person_id_fkey"
            columns: ["surviving_person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_merge_log_surviving_person_id_fkey"
            columns: ["surviving_person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_merge_log_surviving_person_id_fkey"
            columns: ["surviving_person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_relationships: {
        Row: {
          created_at: string
          from_person_id: string
          id: string
          relationship_type: string
          source_system: string | null
          strength_score: number | null
          to_person_id: string
        }
        Insert: {
          created_at?: string
          from_person_id: string
          id?: string
          relationship_type: string
          source_system?: string | null
          strength_score?: number | null
          to_person_id: string
        }
        Update: {
          created_at?: string
          from_person_id?: string
          id?: string
          relationship_type?: string
          source_system?: string | null
          strength_score?: number | null
          to_person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_relationships_from_person_id_fkey"
            columns: ["from_person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_relationships_from_person_id_fkey"
            columns: ["from_person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_relationships_from_person_id_fkey"
            columns: ["from_person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_relationships_to_person_id_fkey"
            columns: ["to_person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_relationships_to_person_id_fkey"
            columns: ["to_person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_relationships_to_person_id_fkey"
            columns: ["to_person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_source_links: {
        Row: {
          created_at: string
          id: string
          linked_at: string
          linked_by: string
          match_score: number | null
          match_type: string
          person_id: string
          source_record_key: string
          source_system: string
          source_table: string
        }
        Insert: {
          created_at?: string
          id?: string
          linked_at?: string
          linked_by?: string
          match_score?: number | null
          match_type: string
          person_id: string
          source_record_key: string
          source_system: string
          source_table: string
        }
        Update: {
          created_at?: string
          id?: string
          linked_at?: string
          linked_by?: string
          match_score?: number | null
          match_type?: string
          person_id?: string
          source_record_key?: string
          source_system?: string
          source_table?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_source_links_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_source_links_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_source_links_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_tags: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          created_at: string
          expires_at: string | null
          id: string
          person_id: string
          tag_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          person_id: string
          tag_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          person_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_tags_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_tags_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_tags_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tag_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_crosstabs: {
        Row: {
          created_at: string
          header_row1: string | null
          header_row2: string | null
          id: number
          pct: number | null
          pdf_page: number | null
          question_id: number
          response_label: string
          sample_n: number | null
          segment_group_raw: string
          segment_label_raw: string
          segment_type: string | null
          segment_value: string
          table_index: number
        }
        Insert: {
          created_at?: string
          header_row1?: string | null
          header_row2?: string | null
          id?: never
          pct?: number | null
          pdf_page?: number | null
          question_id: number
          response_label: string
          sample_n?: number | null
          segment_group_raw: string
          segment_label_raw: string
          segment_type?: string | null
          segment_value: string
          table_index?: number
        }
        Update: {
          created_at?: string
          header_row1?: string | null
          header_row2?: string | null
          id?: never
          pct?: number | null
          pdf_page?: number | null
          question_id?: number
          response_label?: string
          sample_n?: number | null
          segment_group_raw?: string
          segment_label_raw?: string
          segment_type?: string | null
          segment_value?: string
          table_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "poll_crosstabs_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "poll_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_questions: {
        Row: {
          id: number
          question_number: number
          question_text: string
          survey_id: number
        }
        Insert: {
          id?: never
          question_number: number
          question_text: string
          survey_id: number
        }
        Update: {
          id?: never
          question_number?: number
          question_text?: string
          survey_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "poll_questions_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "poll_surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_surveys: {
        Row: {
          created_at: string
          geography: string
          id: number
          margin_of_error_pct: number | null
          name: string
          poll_end_date: string
          poll_start_date: string
          pollster: string | null
          sample_size: number | null
          source_files: Json
        }
        Insert: {
          created_at?: string
          geography: string
          id?: never
          margin_of_error_pct?: number | null
          name: string
          poll_end_date: string
          poll_start_date: string
          pollster?: string | null
          sample_size?: number | null
          source_files?: Json
        }
        Update: {
          created_at?: string
          geography?: string
          id?: never
          margin_of_error_pct?: number | null
          name?: string
          poll_end_date?: string
          poll_start_date?: string
          pollster?: string | null
          sample_size?: number | null
          source_files?: Json
        }
        Relationships: []
      }
      race_candidates: {
        Row: {
          ballot_order: number | null
          candidate_name: string
          created_at: string
          data_source: string | null
          id: number
          import_batch_id: string | null
          party: string | null
          race_id: number
        }
        Insert: {
          ballot_order?: number | null
          candidate_name: string
          created_at?: string
          data_source?: string | null
          id?: number
          import_batch_id?: string | null
          party?: string | null
          race_id: number
        }
        Update: {
          ballot_order?: number | null
          candidate_name?: string
          created_at?: string
          data_source?: string | null
          id?: number
          import_batch_id?: string | null
          party?: string | null
          race_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "race_candidates_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "race_candidates_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "race_candidates_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      races: {
        Row: {
          created_at: string
          district_code: string | null
          district_type: string | null
          election_id: number
          id: number
          is_partisan: boolean
          office_name: string
          race_key: string
          seat_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          district_code?: string | null
          district_type?: string | null
          election_id: number
          id?: number
          is_partisan?: boolean
          office_name: string
          race_key: string
          seat_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          district_code?: string | null
          district_type?: string | null
          election_id?: number
          id?: number
          is_partisan?: boolean
          office_name?: string
          race_key?: string
          seat_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "races_election_id_fkey"
            columns: ["election_id"]
            isOneToOne: false
            referencedRelation: "elections"
            referencedColumns: ["id"]
          },
        ]
      }
      raw_election_results: {
        Row: {
          county: string | null
          created_at: string | null
          district: string | null
          election_name: string | null
          election_year: number | null
          id: number
          import_batch: string | null
          office_name: string | null
          party: string | null
          payload: Json | null
          row_num: number | null
          row_payload: Json | null
          source_file_name: string | null
        }
        Insert: {
          county?: string | null
          created_at?: string | null
          district?: string | null
          election_name?: string | null
          election_year?: number | null
          id?: number
          import_batch?: string | null
          office_name?: string | null
          party?: string | null
          payload?: Json | null
          row_num?: number | null
          row_payload?: Json | null
          source_file_name?: string | null
        }
        Update: {
          county?: string | null
          created_at?: string | null
          district?: string | null
          election_name?: string | null
          election_year?: number | null
          id?: number
          import_batch?: string | null
          office_name?: string | null
          party?: string | null
          payload?: Json | null
          row_num?: number | null
          row_payload?: Json | null
          source_file_name?: string | null
        }
        Relationships: []
      }
      raw_vh: {
        Row: {
          county: string | null
          created_at: string | null
          election_date: string | null
          election_type: string | null
          id: number
          import_batch: string | null
          imported_at: string | null
          key_registrant: string | null
          party_ballot: string | null
          row_payload: Json | null
          source_file_name: string | null
          voter_id: string | null
          voting_method: string | null
        }
        Insert: {
          county?: string | null
          created_at?: string | null
          election_date?: string | null
          election_type?: string | null
          id?: number
          import_batch?: string | null
          imported_at?: string | null
          key_registrant?: string | null
          party_ballot?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          voter_id?: string | null
          voting_method?: string | null
        }
        Update: {
          county?: string | null
          created_at?: string | null
          election_date?: string | null
          election_type?: string | null
          id?: number
          import_batch?: string | null
          imported_at?: string | null
          key_registrant?: string | null
          party_ballot?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          voter_id?: string | null
          voting_method?: string | null
        }
        Relationships: []
      }
      raw_vr: {
        Row: {
          congressional_district: string | null
          county: string | null
          created_at: string
          date_last_voted: string | null
          date_of_birth: string | null
          date_of_party_affiliation: string | null
          date_of_registration: string | null
          id: number
          import_batch: string | null
          imported_at: string | null
          key_registrant: string | null
          name_first: string | null
          name_last: string | null
          name_middle: string | null
          name_suffix: string | null
          party: string | null
          precinct_name: string | null
          registrant_reason: string | null
          registrant_status: string | null
          res_address_nbr: string | null
          res_address_nbr_suffix: string | null
          res_city: string | null
          res_physical_address: string | null
          res_state: string | null
          res_unit_nbr: string | null
          res_zip4: string | null
          res_zip5: string | null
          source_file_name: string | null
          state_representative_district: string | null
          state_senate_district: string | null
          street_dir_prefix: string | null
          street_dir_suffix: string | null
          street_name: string | null
          street_type: string | null
          unit_type: string | null
          voter_id: string | null
        }
        Insert: {
          congressional_district?: string | null
          county?: string | null
          created_at?: string
          date_last_voted?: string | null
          date_of_birth?: string | null
          date_of_party_affiliation?: string | null
          date_of_registration?: string | null
          id?: number
          import_batch?: string | null
          imported_at?: string | null
          key_registrant?: string | null
          name_first?: string | null
          name_last?: string | null
          name_middle?: string | null
          name_suffix?: string | null
          party?: string | null
          precinct_name?: string | null
          registrant_reason?: string | null
          registrant_status?: string | null
          res_address_nbr?: string | null
          res_address_nbr_suffix?: string | null
          res_city?: string | null
          res_physical_address?: string | null
          res_state?: string | null
          res_unit_nbr?: string | null
          res_zip4?: string | null
          res_zip5?: string | null
          source_file_name?: string | null
          state_representative_district?: string | null
          state_senate_district?: string | null
          street_dir_prefix?: string | null
          street_dir_suffix?: string | null
          street_name?: string | null
          street_type?: string | null
          unit_type?: string | null
          voter_id?: string | null
        }
        Update: {
          congressional_district?: string | null
          county?: string | null
          created_at?: string
          date_last_voted?: string | null
          date_of_birth?: string | null
          date_of_party_affiliation?: string | null
          date_of_registration?: string | null
          id?: number
          import_batch?: string | null
          imported_at?: string | null
          key_registrant?: string | null
          name_first?: string | null
          name_last?: string | null
          name_middle?: string | null
          name_suffix?: string | null
          party?: string | null
          precinct_name?: string | null
          registrant_reason?: string | null
          registrant_status?: string | null
          res_address_nbr?: string | null
          res_address_nbr_suffix?: string | null
          res_city?: string | null
          res_physical_address?: string | null
          res_state?: string | null
          res_unit_nbr?: string | null
          res_zip4?: string | null
          res_zip5?: string | null
          source_file_name?: string | null
          state_representative_district?: string | null
          state_senate_district?: string | null
          street_dir_prefix?: string | null
          street_dir_suffix?: string | null
          street_name?: string | null
          street_type?: string | null
          unit_type?: string | null
          voter_id?: string | null
        }
        Relationships: []
      }
      raw_vr_backup_20260408: {
        Row: {
          congressional_district: string | null
          county: string | null
          created_at: string | null
          date_last_voted: string | null
          date_of_birth: string | null
          date_of_party_affiliation: string | null
          date_of_registration: string | null
          id: number | null
          import_batch: string | null
          imported_at: string | null
          key_registrant: string | null
          name_first: string | null
          name_last: string | null
          name_middle: string | null
          name_suffix: string | null
          party: string | null
          precinct_name: string | null
          registrant_reason: string | null
          registrant_status: string | null
          res_address_nbr: string | null
          res_address_nbr_suffix: string | null
          res_city: string | null
          res_physical_address: string | null
          res_state: string | null
          res_unit_nbr: string | null
          res_zip4: string | null
          res_zip5: string | null
          source_file_name: string | null
          state_representative_district: string | null
          state_senate_district: string | null
          street_dir_prefix: string | null
          street_dir_suffix: string | null
          street_name: string | null
          street_type: string | null
          unit_type: string | null
          voter_id: string | null
        }
        Insert: {
          congressional_district?: string | null
          county?: string | null
          created_at?: string | null
          date_last_voted?: string | null
          date_of_birth?: string | null
          date_of_party_affiliation?: string | null
          date_of_registration?: string | null
          id?: number | null
          import_batch?: string | null
          imported_at?: string | null
          key_registrant?: string | null
          name_first?: string | null
          name_last?: string | null
          name_middle?: string | null
          name_suffix?: string | null
          party?: string | null
          precinct_name?: string | null
          registrant_reason?: string | null
          registrant_status?: string | null
          res_address_nbr?: string | null
          res_address_nbr_suffix?: string | null
          res_city?: string | null
          res_physical_address?: string | null
          res_state?: string | null
          res_unit_nbr?: string | null
          res_zip4?: string | null
          res_zip5?: string | null
          source_file_name?: string | null
          state_representative_district?: string | null
          state_senate_district?: string | null
          street_dir_prefix?: string | null
          street_dir_suffix?: string | null
          street_name?: string | null
          street_type?: string | null
          unit_type?: string | null
          voter_id?: string | null
        }
        Update: {
          congressional_district?: string | null
          county?: string | null
          created_at?: string | null
          date_last_voted?: string | null
          date_of_birth?: string | null
          date_of_party_affiliation?: string | null
          date_of_registration?: string | null
          id?: number | null
          import_batch?: string | null
          imported_at?: string | null
          key_registrant?: string | null
          name_first?: string | null
          name_last?: string | null
          name_middle?: string | null
          name_suffix?: string | null
          party?: string | null
          precinct_name?: string | null
          registrant_reason?: string | null
          registrant_status?: string | null
          res_address_nbr?: string | null
          res_address_nbr_suffix?: string | null
          res_city?: string | null
          res_physical_address?: string | null
          res_state?: string | null
          res_unit_nbr?: string | null
          res_zip4?: string | null
          res_zip5?: string | null
          source_file_name?: string | null
          state_representative_district?: string | null
          state_senate_district?: string | null
          street_dir_prefix?: string | null
          street_dir_suffix?: string | null
          street_name?: string | null
          street_type?: string | null
          unit_type?: string | null
          voter_id?: string | null
        }
        Relationships: []
      }
      reach_out_list_items: {
        Row: {
          address_line: string | null
          city: string | null
          created_at: string
          display_name: string
          email: string | null
          id: string
          notes: string | null
          organizer_id: string
          phone: string | null
          voter_directory_entry_id: string | null
          zip: string | null
        }
        Insert: {
          address_line?: string | null
          city?: string | null
          created_at?: string
          display_name: string
          email?: string | null
          id?: string
          notes?: string | null
          organizer_id: string
          phone?: string | null
          voter_directory_entry_id?: string | null
          zip?: string | null
        }
        Update: {
          address_line?: string | null
          city?: string | null
          created_at?: string
          display_name?: string
          email?: string | null
          id?: string
          notes?: string | null
          organizer_id?: string
          phone?: string | null
          voter_directory_entry_id?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reach_out_list_items_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "ward_organizers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reach_out_list_items_voter_directory_entry_id_fkey"
            columns: ["voter_directory_entry_id"]
            isOneToOne: false
            referencedRelation: "voter_directory_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_definitions: {
        Row: {
          created_at: string
          id: string
          is_system: boolean
          tag_category: string | null
          tag_key: string
          tag_label: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_system?: boolean
          tag_category?: string | null
          tag_key: string
          tag_label: string
        }
        Update: {
          created_at?: string
          id?: string
          is_system?: boolean
          tag_category?: string | null
          tag_key?: string
          tag_label?: string
        }
        Relationships: []
      }
      turf_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          assignment_status: string
          created_at: string
          id: number
          turf_id: number
          volunteer_id: number
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          assignment_status?: string
          created_at?: string
          id?: number
          turf_id: number
          volunteer_id: number
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          assignment_status?: string
          created_at?: string
          id?: number
          turf_id?: number
          volunteer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "turf_assignments_turf_id_fkey"
            columns: ["turf_id"]
            isOneToOne: false
            referencedRelation: "turfs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turf_assignments_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      turfs: {
        Row: {
          contact_count: number | null
          county_id: number | null
          created_at: string
          door_count: number | null
          id: number
          is_active: boolean
          precinct_label: string | null
          priority_score: number | null
          turf_key: string | null
          turf_name: string
          updated_at: string
        }
        Insert: {
          contact_count?: number | null
          county_id?: number | null
          created_at?: string
          door_count?: number | null
          id?: number
          is_active?: boolean
          precinct_label?: string | null
          priority_score?: number | null
          turf_key?: string | null
          turf_name: string
          updated_at?: string
        }
        Update: {
          contact_count?: number | null
          county_id?: number | null
          created_at?: string
          door_count?: number | null
          id?: number
          is_active?: boolean
          precinct_label?: string | null
          priority_score?: number | null
          turf_key?: string | null
          turf_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "turfs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "turfs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "turfs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "turfs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "turfs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "turfs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turfs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "turfs_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      vh_voter_participation: {
        Row: {
          elections_voted: number
          voter_id: string
        }
        Insert: {
          elections_voted?: number
          voter_id: string
        }
        Update: {
          elections_voted?: number
          voter_id?: string
        }
        Relationships: []
      }
      voice_transcripts: {
        Row: {
          auth_user_id: string
          cleaned_transcript: string | null
          confidence_score: number | null
          context_id: string | null
          context_type: string
          created_at: string
          duration_seconds: number | null
          flagged_terms_json: Json | null
          id: string
          mode: string | null
          raw_transcript: string | null
          structured_output_json: Json | null
        }
        Insert: {
          auth_user_id: string
          cleaned_transcript?: string | null
          confidence_score?: number | null
          context_id?: string | null
          context_type?: string
          created_at?: string
          duration_seconds?: number | null
          flagged_terms_json?: Json | null
          id?: string
          mode?: string | null
          raw_transcript?: string | null
          structured_output_json?: Json | null
        }
        Update: {
          auth_user_id?: string
          cleaned_transcript?: string | null
          confidence_score?: number | null
          context_id?: string | null
          context_type?: string
          created_at?: string
          duration_seconds?: number | null
          flagged_terms_json?: Json | null
          id?: string
          mode?: string | null
          raw_transcript?: string | null
          structured_output_json?: Json | null
        }
        Relationships: []
      }
      volunteer_role_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          created_at: string
          id: number
          role_id: number
          volunteer_id: number
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          id?: number
          role_id: number
          volunteer_id: number
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          id?: number
          role_id?: number
          volunteer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_role_assignments_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "volunteer_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_role_assignments_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_roles: {
        Row: {
          created_at: string
          id: number
          is_active: boolean
          role_description: string | null
          role_key: string
          role_name: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_active?: boolean
          role_description?: string | null
          role_key: string
          role_name: string
        }
        Update: {
          created_at?: string
          id?: number
          is_active?: boolean
          role_description?: string | null
          role_key?: string
          role_name?: string
        }
        Relationships: []
      }
      volunteer_signups: {
        Row: {
          created_at: string
          email: string
          first_name: string
          help_church_outreach: boolean
          help_event_volunteer: boolean
          help_hosting: boolean
          help_leadership: boolean
          help_petition_carrier: boolean
          help_phone_text: boolean
          help_tabling: boolean
          id: string
          last_name: string
          notes: string | null
          person_id: string | null
          phone: string
          source: string
          zip_code: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          help_church_outreach?: boolean
          help_event_volunteer?: boolean
          help_hosting?: boolean
          help_leadership?: boolean
          help_petition_carrier?: boolean
          help_phone_text?: boolean
          help_tabling?: boolean
          id?: string
          last_name: string
          notes?: string | null
          person_id?: string | null
          phone: string
          source?: string
          zip_code: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          help_church_outreach?: boolean
          help_event_volunteer?: boolean
          help_hosting?: boolean
          help_leadership?: boolean
          help_petition_carrier?: boolean
          help_phone_text?: boolean
          help_tabling?: boolean
          id?: string
          last_name?: string
          notes?: string | null
          person_id?: string | null
          phone?: string
          source?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_signups_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_task_completions: {
        Row: {
          completed_at: string
          completion_note: string | null
          created_at: string
          id: number
          task_id: number
          volunteer_id: number
        }
        Insert: {
          completed_at?: string
          completion_note?: string | null
          created_at?: string
          id?: number
          task_id: number
          volunteer_id: number
        }
        Update: {
          completed_at?: string
          completion_note?: string | null
          created_at?: string
          id?: number
          task_id?: number
          volunteer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_task_completions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "volunteer_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_task_completions_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_tasks: {
        Row: {
          county_id: number | null
          created_at: string
          created_by: string | null
          description: string | null
          due_at: string | null
          id: number
          task_status: string
          title: string
          updated_at: string
          volunteer_id: number | null
        }
        Insert: {
          county_id?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_at?: string | null
          id?: number
          task_status?: string
          title: string
          updated_at?: string
          volunteer_id?: number | null
        }
        Update: {
          county_id?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_at?: string | null
          id?: number
          task_status?: string
          title?: string
          updated_at?: string
          volunteer_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteer_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteer_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteer_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteer_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteer_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteer_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteer_tasks_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteers: {
        Row: {
          attribution_source: string | null
          availability_summary: string | null
          county_id: number | null
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          lane_interest: string | null
          last_name: string | null
          notes: string | null
          onboarding_state: string
          person_id: string | null
          phone: string | null
          preference_digital_in_person: string | null
          updated_at: string
          volunteer_status: string
          voter_linkage_status: string
        }
        Insert: {
          attribution_source?: string | null
          availability_summary?: string | null
          county_id?: number | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          lane_interest?: string | null
          last_name?: string | null
          notes?: string | null
          onboarding_state?: string
          person_id?: string | null
          phone?: string | null
          preference_digital_in_person?: string | null
          updated_at?: string
          volunteer_status?: string
          voter_linkage_status?: string
        }
        Update: {
          attribution_source?: string | null
          availability_summary?: string | null
          county_id?: number | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          lane_interest?: string | null
          last_name?: string | null
          notes?: string | null
          onboarding_state?: string
          person_id?: string | null
          phone?: string | null
          preference_digital_in_person?: string | null
          updated_at?: string
          volunteer_status?: string
          voter_linkage_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteers_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteers_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteers_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteers_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteers_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteers_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteers_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteers_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "volunteers_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      voter_directory_entries: {
        Row: {
          address_line: string | null
          city: string | null
          created_at: string
          display_name: string
          email: string | null
          id: string
          phone: string | null
          ward_slug: string
          zip: string | null
        }
        Insert: {
          address_line?: string | null
          city?: string | null
          created_at?: string
          display_name: string
          email?: string | null
          id?: string
          phone?: string | null
          ward_slug: string
          zip?: string | null
        }
        Update: {
          address_line?: string | null
          city?: string | null
          created_at?: string
          display_name?: string
          email?: string | null
          id?: string
          phone?: string | null
          ward_slug?: string
          zip?: string | null
        }
        Relationships: []
      }
      voter_initiative_signatures: {
        Row: {
          created_at: string | null
          id: number
          import_batch: string | null
          initiative: string | null
          key_registrant: string | null
          source_file_name: string | null
          voter_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          import_batch?: string | null
          initiative?: string | null
          key_registrant?: string | null
          source_file_name?: string | null
          voter_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          import_batch?: string | null
          initiative?: string | null
          key_registrant?: string | null
          source_file_name?: string | null
          voter_id?: string | null
        }
        Relationships: []
      }
      ward_organizers: {
        Row: {
          auth_user_id: string
          commitment_goal: number
          created_at: string
          display_name: string
          id: string
          parent_id: string | null
          referral_code: string
          updated_at: string
          ward_slug: string
        }
        Insert: {
          auth_user_id: string
          commitment_goal?: number
          created_at?: string
          display_name: string
          id?: string
          parent_id?: string | null
          referral_code?: string
          updated_at?: string
          ward_slug: string
        }
        Update: {
          auth_user_id?: string
          commitment_goal?: number
          created_at?: string
          display_name?: string
          id?: string
          parent_id?: string | null
          referral_code?: string
          updated_at?: string
          ward_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "ward_organizers_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "ward_organizers"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_task_dependencies: {
        Row: {
          created_at: string
          depends_on_task_id: number
          id: number
          task_id: number
        }
        Insert: {
          created_at?: string
          depends_on_task_id: number
          id?: number
          task_id: number
        }
        Update: {
          created_at?: string
          depends_on_task_id?: number
          id?: number
          task_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workflow_task_dependencies_depends_on_task_id_fkey"
            columns: ["depends_on_task_id"]
            isOneToOne: false
            referencedRelation: "workflow_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_task_dependencies_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "workflow_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_tasks: {
        Row: {
          county_id: number | null
          created_at: string
          department: string
          description: string | null
          due_at: string | null
          event_id: number | null
          id: number
          owner: string | null
          person_id: string | null
          priority: string
          status: string
          title: string
          turf_id: number | null
          updated_at: string
          volunteer_id: number | null
        }
        Insert: {
          county_id?: number | null
          created_at?: string
          department?: string
          description?: string | null
          due_at?: string | null
          event_id?: number | null
          id?: number
          owner?: string | null
          person_id?: string | null
          priority?: string
          status?: string
          title: string
          turf_id?: number | null
          updated_at?: string
          volunteer_id?: number | null
        }
        Update: {
          county_id?: number | null
          created_at?: string
          department?: string
          description?: string | null
          due_at?: string | null
          event_id?: number | null
          id?: number
          owner?: string | null
          person_id?: string | null
          priority?: string
          status?: string
          title?: string
          turf_id?: number | null
          updated_at?: string
          volunteer_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "workflow_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "workflow_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "workflow_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "workflow_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "workflow_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "workflow_tasks_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "workflow_tasks_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "workflow_tasks_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_tasks_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "workflow_tasks_turf_id_fkey"
            columns: ["turf_id"]
            isOneToOne: false
            referencedRelation: "turfs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_tasks_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      analytics_city_election_candidate_votes: {
        Row: {
          candidate_name: string | null
          city_election_result_id: number | null
          city_key: string | null
          city_name: string | null
          election_year: number | null
          office_name: string | null
          party: string | null
          total_votes_in_race: number | null
          vote_share: number | null
          votes: number | null
        }
        Relationships: []
      }
      analytics_city_election_totals: {
        Row: {
          city_id: number | null
          city_key: string | null
          city_name: string | null
          dem_vote_share: number | null
          democratic_votes: number | null
          election_year: number | null
          office_name: string | null
          primary_county_name: string | null
          race_id: number | null
          rep_vote_share: number | null
          republican_votes: number | null
          total_votes: number | null
        }
        Relationships: []
      }
      analytics_city_election_turnout: {
        Row: {
          ballots_cast: number | null
          city_election_turnout_id: number | null
          city_key: string | null
          city_name: string | null
          election_year: number | null
          registered_voters: number | null
          turnout_rate: number | null
        }
        Relationships: []
      }
      analytics_county_economic_stress: {
        Row: {
          average_weekly_wage: number | null
          county_name: string | null
          median_household_income: number | null
          poverty_population: number | null
          unemployment_rate: number | null
        }
        Relationships: []
      }
      analytics_county_election_candidate_votes: {
        Row: {
          candidate_name: string | null
          county_election_result_id: number | null
          county_name: string | null
          election_year: number | null
          office_name: string | null
          party: string | null
          total_votes_in_race: number | null
          vote_share: number | null
          votes: number | null
        }
        Relationships: []
      }
      analytics_county_election_totals: {
        Row: {
          county_id: number | null
          county_name: string | null
          dem_vote_share: number | null
          democratic_votes: number | null
          election_year: number | null
          office_name: string | null
          race_id: number | null
          rep_vote_share: number | null
          republican_votes: number | null
          total_votes: number | null
        }
        Relationships: []
      }
      analytics_county_election_turnout: {
        Row: {
          ballots_cast: number | null
          county_election_turnout_id: number | null
          county_name: string | null
          election_year: number | null
          registered_voters: number | null
          turnout_rate: number | null
        }
        Relationships: []
      }
      analytics_county_power_profile: {
        Row: {
          asian_population: number | null
          black_population: number | null
          county_fips: string | null
          county_name: string | null
          hispanic_population: number | null
          median_household_income: number | null
          poverty_population: number | null
          registered_voters: number | null
          registration_penetration_rate: number | null
          state_fips: string | null
          voting_age_population: number | null
          white_population: number | null
        }
        Relationships: []
      }
      analytics_county_registration_gap: {
        Row: {
          county_fips: string | null
          county_name: string | null
          registered_voters: number | null
          registration_penetration_rate: number | null
          state_fips: string | null
          voting_age_population: number | null
        }
        Relationships: []
      }
      analytics_precinct_performance: {
        Row: {
          county_name: string | null
          dem_vote_share: number | null
          democratic_votes: number | null
          election_year: number | null
          office_name: string | null
          precinct_key: string | null
          rep_vote_share: number | null
          republican_votes: number | null
          total_votes: number | null
        }
        Relationships: []
      }
      analytics_precinct_turnout_gap: {
        Row: {
          ballots_cast: number | null
          county_name: string | null
          election_year: number | null
          precinct_key: string | null
          registered_voters: number | null
          turnout_rate: number | null
        }
        Relationships: []
      }
      bls_laus_county_latest: {
        Row: {
          county_id: number | null
          created_at: string | null
          data_source: string | null
          employment: number | null
          id: number | null
          import_batch_id: string | null
          labor_force: number | null
          period: string | null
          series_ids: Json | null
          source_month: number | null
          source_year: number | null
          unemployment: number | null
          unemployment_rate: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_laus_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      bls_qcew_county_latest: {
        Row: {
          average_weekly_wage: number | null
          county_id: number | null
          created_at: string | null
          data_source: string | null
          employment: number | null
          establishments: number | null
          id: number | null
          import_batch_id: string | null
          industry_code: string | null
          is_annual_avg: boolean | null
          ownership_code: string | null
          qtr: string | null
          source_reference: string | null
          source_year: number | null
          total_annual_wages: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "bls_qcew_county_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      cd2_county_intel_v: {
        Row: {
          bls_unemployment_rate_pct: number | null
          county_dem_residual_pct: number | null
          county_id: number | null
          county_model_bucket: string | null
          county_name: string | null
          county_observed_dem_2022_pct: number | null
          county_observed_dem_2024_pct: number | null
          dem_power_score: number | null
          model_expected_dem_pct: number | null
          pct_black_population: number | null
          pct_hispanic_population: number | null
          pct_white_population: number | null
          poverty_rate_pct: number | null
          registration_rate_pct: number | null
          renter_share_pct: number | null
          turnout_rate_pct: number | null
        }
        Relationships: []
      }
      cd2_county_master_v: {
        Row: {
          acs_source_year: number | null
          county_fips: string | null
          county_id: number | null
          county_key: string | null
          county_name: string | null
          dem_power_score: number | null
          dem_swing_pct_2022_to_2024: number | null
          dem_swing_pct_2022_to_2026: number | null
          dem_swing_pct_2024_to_2026: number | null
          gov_2022_general_dem_pct: number | null
          pct_black_population: number | null
          pct_hispanic_population: number | null
          pct_white_population: number | null
          poverty_rate_pct: number | null
          pres_2024_general_dem_pct: number | null
          registered_voters: number | null
          registration_rate_pct: number | null
          renter_share_pct: number | null
          signer_rate_per_1000_registrants: Json | null
          signers_by_initiative: Json | null
          sos_2026_dem_primary_pct: number | null
          sos_2026_dem_votes: number | null
          sos_2026_total_votes: number | null
          state_fips: string | null
          total_population: number | null
          turnout_rate_pct: number | null
          vh_unique_voters: number | null
          voting_age_population: number | null
        }
        Relationships: []
      }
      cd2_dem_target_precincts_v: {
        Row: {
          baseline_dem_pct: number | null
          cd2_max_registered_voters: number | null
          county_id: number | null
          county_name: string | null
          dem_growth_target_score: number | null
          dem_pct_2022_governor: number | null
          dem_pct_2024_president: number | null
          dem_pct_2026_primary: number | null
          dem_swing_2022_to_2024: number | null
          election_size_score_0_100: number | null
          grassroots_mobilization_score: number | null
          initiative_engagement_score: number | null
          initiative_signature_rows: number | null
          initiative_signature_touches_per_1k_registrants: number | null
          initiative_unique_per_1k_registrants: number | null
          initiative_unique_signers: number | null
          mobilization_blend_score: number | null
          persuasion_swing_score_0_100: number | null
          precinct_label: string | null
          precinct_priority_score: number | null
          precinct_priority_score_balanced: number | null
          precinct_priority_score_with_initiative_boost: number | null
          registered_voters: number | null
          signers_casino: number | null
          signers_marijuana: number | null
          signers_ranked_choice: number | null
          signers_redistricting: number | null
          size_score_raw: number | null
          target_quintile: number | null
          target_tier: string | null
          total_votes_2022_governor: number | null
          total_votes_2024_president: number | null
          total_votes_2026_primary: number | null
          turnout_gap_score_raw: number | null
          turnout_rate_pct: number | null
          turnout_voters: number | null
          voter_density_weight_0_100: number | null
        }
        Relationships: []
      }
      cd2_dem_target_voters_v: {
        Row: {
          county_id: number | null
          county_name: string | null
          dem_lean_headroom: number | null
          dem_lean_score: number | null
          has_vote_history: boolean | null
          key_registrant: string | null
          party_lean_0_100: number | null
          party_raw: string | null
          precinct_dem_baseline_pct: number | null
          precinct_dem_growth_target_score: number | null
          precinct_label: string | null
          precinct_registered_voters: number | null
          precinct_target_quintile: number | null
          precinct_target_tier: string | null
          precinct_voter_density_weight_0_100: number | null
          vh_event_rows: number | null
          voter_dem_growth_priority_score: number | null
          voter_id: string | null
        }
        Relationships: []
      }
      cd2_precinct_intel_v: {
        Row: {
          baseline_dem_pct: number | null
          blank_density_score: number | null
          county_dem_residual_pct: number | null
          county_id: number | null
          county_name: string | null
          county_observed_dem_2024_pct: number | null
          estimated_dem_votes_if_precinct_matched_county: number | null
          estimated_dem_votes_if_precinct_matched_model: number | null
          initiative_engagement_score: number | null
          model_expected_dem_pct: number | null
          precinct_headroom_to_model_pct: number | null
          precinct_label: string | null
          precinct_priority_score_balanced: number | null
          precinct_vs_county_gap_pct: number | null
          precinct_vs_county_vote_share_gap_pct: number | null
          registered_voters: number | null
          turnout_gap_score_raw: number | null
          turnout_rate_pct: number | null
          voter_model_archetype: string | null
        }
        Relationships: []
      }
      cd2_precinct_priority_v: {
        Row: {
          baseline_dem_pct: number | null
          county_id: number | null
          county_name: string | null
          dem_pct_2022_governor: number | null
          dem_pct_2024_president: number | null
          dem_pct_2026_primary: number | null
          dem_swing_2022_to_2024: number | null
          election_size_score_0_100: number | null
          grassroots_mobilization_score: number | null
          initiative_engagement_score: number | null
          initiative_signature_rows: number | null
          initiative_signature_touches_per_1k_registrants: number | null
          initiative_unique_per_1k_registrants: number | null
          initiative_unique_signers: number | null
          precinct_label: string | null
          precinct_priority_score: number | null
          precinct_priority_score_balanced: number | null
          precinct_priority_score_with_initiative_boost: number | null
          registered_voters: number | null
          signers_casino: number | null
          signers_marijuana: number | null
          signers_ranked_choice: number | null
          signers_redistricting: number | null
          size_score_raw: number | null
          total_votes_2022_governor: number | null
          total_votes_2024_president: number | null
          total_votes_2026_primary: number | null
          turnout_gap_score_raw: number | null
          turnout_rate_pct: number | null
          turnout_voters: number | null
        }
        Relationships: []
      }
      cd2_precinct_trend_scaffold_v: {
        Row: {
          county_name: string | null
          dem_pct: number | null
          election_year: number | null
          precinct_label: string | null
          precinct_size_score: number | null
          precinct_turnout_trend_placeholder_score: number | null
          total_votes: number | null
        }
        Relationships: []
      }
      cd2_segment_hotspots_v: {
        Row: {
          county_id: number | null
          county_name: string | null
          precinct_label: string | null
          precinct_registered_voters: number | null
          segment_bucket: string | null
          segment_share_per_1k_registrants: number | null
          voter_count: number | null
        }
        Relationships: []
      }
      cd2_voter_scorecard_v: {
        Row: {
          campaign_engagement_score: number | null
          county_id: number | null
          county_name: string | null
          dem_lean_headroom: number | null
          dem_lean_score: number | null
          funder_potential_proxy_score: number | null
          has_vote_history: boolean | null
          initiative_breadth: number | null
          initiative_signature_rows: number | null
          key_registrant: string | null
          precinct_dem_baseline_pct: number | null
          precinct_initiative_engagement_score: number | null
          precinct_label: string | null
          precinct_registered_voters: number | null
          segment_bucket: string | null
          signed_casino: boolean | null
          signed_marijuana: boolean | null
          signed_ranked_choice: boolean | null
          signed_redistricting: boolean | null
          vh_event_rows: number | null
          voter_id: string | null
        }
        Relationships: []
      }
      compliance_person_channel_status_v: {
        Row: {
          channel: string | null
          consent_status: string | null
          display_name: string | null
          is_suppressed: boolean | null
          person_id: string | null
          suppression_reason: string | null
        }
        Relationships: []
      }
      county_detail_export_v: {
        Row: {
          acs_source_year: number | null
          asian_population: number | null
          average_weekly_wage: number | null
          bachelors_or_higher: number | null
          bachelors_or_higher_rate_pct: number | null
          black_population: number | null
          casino_signers: number | null
          casino_signers_per_1k_vr: number | null
          county_civic_activity_score: number | null
          county_democratic_baseline_score: number | null
          county_fips: string | null
          county_id: number | null
          county_name: string | null
          county_priority_score: number | null
          county_registration_opportunity_score: number | null
          county_target_votes_at_proportional_share: number | null
          county_turnout_opportunity_score: number | null
          county_vote_share_of_state: number | null
          county_votes_needed_for_majority_of_expected_turnout: number | null
          dem_pct_2022_governor: number | null
          dem_pct_2024_president: number | null
          dem_pct_2026_sos: number | null
          dem_swing_2022_to_2024: number | null
          dem_swing_2024_to_2026: number | null
          employment: number | null
          establishments: number | null
          expected_democratic_baseline_votes: number | null
          expected_turnout_votes: number | null
          hispanic_population: number | null
          labor_force: number | null
          laus_source_month: number | null
          laus_source_year: number | null
          marijuana_signers: number | null
          marijuana_signers_per_1k_vr: number | null
          median_household_income: number | null
          model_notes: string | null
          owner_occupied_housing: number | null
          pct_asian_population: number | null
          pct_black_population: number | null
          pct_hispanic_population: number | null
          pct_white_population: number | null
          poll_context_notes: string | null
          poverty_population: number | null
          poverty_rate_pct: number | null
          qcew_employment: number | null
          qcew_source_year: number | null
          ranked_choice_signers: number | null
          ranked_choice_signers_per_1k_vr: number | null
          redistricting_signers: number | null
          redistricting_signers_per_1k_vr: number | null
          registration_rate_pct: number | null
          registrations_2025_11_to_2026_11_unique_voters: number | null
          renter_occupied_housing: number | null
          renter_share_pct: number | null
          state_fips: string | null
          statewide_expected_turnout_votes: number | null
          statewide_vote_target: number | null
          statewide_vr_unique_voters: number | null
          top_precincts_by_priority: Json | null
          total_population: number | null
          turnout_rate_pct: number | null
          unemployment: number | null
          unemployment_rate: number | null
          vh_unique_voters: number | null
          voting_age_population: number | null
          vr_unique_voters: number | null
          vr_voters: number | null
          white_population: number | null
        }
        Relationships: []
      }
      diagnostics_vr_county_coverage: {
        Row: {
          county_id: number | null
          county_name: string | null
          has_vr_data: boolean | null
          registered_voters: number | null
        }
        Relationships: []
      }
      diagnostics_vr_mapping_coverage: {
        Row: {
          mapped_rows: number | null
          pct_mapped: number | null
          total_rows: number | null
          unmapped_rows: number | null
        }
        Relationships: []
      }
      diagnostics_vr_unmatched_counties: {
        Row: {
          county_normalized: string | null
          raw_county_value: string | null
          row_count: number | null
        }
        Relationships: []
      }
      election_results_county_v: {
        Row: {
          candidate_name: string | null
          contest_id: number | null
          county: string | null
          county_id: number | null
          created_at: string | null
          geography_type: string | null
          id: number | null
          location_label: string | null
          location_raw: string | null
          party: string | null
          precinct: string | null
          race_id: number | null
          reporting_district_code: string | null
          reporting_district_type: string | null
          result_scope: string | null
          row_payload: Json | null
          source_file_name: string | null
          source_precinct_code: string | null
          source_precinct_name: string | null
          total_votes_at_location: number | null
          updated_at: string | null
          vote_pct: number | null
          vote_share_pct: number | null
          vote_total: number | null
          votes: number | null
        }
        Insert: {
          candidate_name?: string | null
          contest_id?: number | null
          county?: string | null
          county_id?: number | null
          created_at?: string | null
          geography_type?: string | null
          id?: number | null
          location_label?: string | null
          location_raw?: string | null
          party?: string | null
          precinct?: string | null
          race_id?: number | null
          reporting_district_code?: string | null
          reporting_district_type?: string | null
          result_scope?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          source_precinct_code?: string | null
          source_precinct_name?: string | null
          total_votes_at_location?: number | null
          updated_at?: string | null
          vote_pct?: number | null
          vote_share_pct?: number | null
          vote_total?: number | null
          votes?: number | null
        }
        Update: {
          candidate_name?: string | null
          contest_id?: number | null
          county?: string | null
          county_id?: number | null
          created_at?: string | null
          geography_type?: string | null
          id?: number | null
          location_label?: string | null
          location_raw?: string | null
          party?: string | null
          precinct?: string | null
          race_id?: number | null
          reporting_district_code?: string | null
          reporting_district_type?: string | null
          result_scope?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          source_precinct_code?: string | null
          source_precinct_name?: string | null
          total_votes_at_location?: number | null
          updated_at?: string | null
          vote_pct?: number | null
          vote_share_pct?: number | null
          vote_total?: number | null
          votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "election_results_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "election_contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      election_results_precinct_v: {
        Row: {
          candidate_name: string | null
          contest_id: number | null
          county: string | null
          county_id: number | null
          created_at: string | null
          geography_type: string | null
          id: number | null
          location_label: string | null
          location_raw: string | null
          party: string | null
          precinct: string | null
          race_id: number | null
          reporting_district_code: string | null
          reporting_district_type: string | null
          result_scope: string | null
          row_payload: Json | null
          source_file_name: string | null
          source_precinct_code: string | null
          source_precinct_name: string | null
          total_votes_at_location: number | null
          updated_at: string | null
          vote_pct: number | null
          vote_share_pct: number | null
          vote_total: number | null
          votes: number | null
        }
        Insert: {
          candidate_name?: string | null
          contest_id?: number | null
          county?: string | null
          county_id?: number | null
          created_at?: string | null
          geography_type?: string | null
          id?: number | null
          location_label?: string | null
          location_raw?: string | null
          party?: string | null
          precinct?: string | null
          race_id?: number | null
          reporting_district_code?: string | null
          reporting_district_type?: string | null
          result_scope?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          source_precinct_code?: string | null
          source_precinct_name?: string | null
          total_votes_at_location?: number | null
          updated_at?: string | null
          vote_pct?: number | null
          vote_share_pct?: number | null
          vote_total?: number | null
          votes?: number | null
        }
        Update: {
          candidate_name?: string | null
          contest_id?: number | null
          county?: string | null
          county_id?: number | null
          created_at?: string | null
          geography_type?: string | null
          id?: number | null
          location_label?: string | null
          location_raw?: string | null
          party?: string | null
          precinct?: string | null
          race_id?: number | null
          reporting_district_code?: string | null
          reporting_district_type?: string | null
          result_scope?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          source_precinct_code?: string | null
          source_precinct_name?: string | null
          total_votes_at_location?: number | null
          updated_at?: string | null
          vote_pct?: number | null
          vote_share_pct?: number | null
          vote_total?: number | null
          votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "election_results_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "election_contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      events_rollup_v: {
        Row: {
          calendar_county_id: number | null
          calendar_geo_city_id: number | null
          calendar_level: string | null
          calendar_precinct_label: string | null
          description: string | null
          ends_at: string | null
          event_county_id: number | null
          event_geo_city_id: number | null
          event_id: number | null
          event_precinct_label: string | null
          event_scope_level: string | null
          location_address: string | null
          location_name: string | null
          location_notes: string | null
          starts_at: string | null
          timezone: string | null
          title: string | null
        }
        Relationships: []
      }
      geo_city_primary_county_v: {
        Row: {
          city_key: string | null
          city_name: string | null
          county_id: number | null
          dominance_share_pct: number | null
          dominant_vr_unique_voters: number | null
          geo_city_id: number | null
          is_override: boolean | null
          override_notes: string | null
          place_fips: string | null
          state_fips: string | null
          vr_unique_voters_total: number | null
        }
        Relationships: []
      }
      kpi_campaign_snapshot_v: {
        Row: {
          active_volunteers: number | null
          blocked_workflow_tasks: number | null
          computed_at: string | null
          events_this_week: number | null
          field_contacts_7d: number | null
          open_workflow_tasks: number | null
          total_volunteers: number | null
        }
        Relationships: []
      }
      kpi_county_snapshot_v: {
        Row: {
          active_volunteers: number | null
          county_id: number | null
          county_name: string | null
          events_next_14d: number | null
          field_contacts_30d: number | null
          open_workflow_tasks: number | null
        }
        Relationships: []
      }
      people_master_v: {
        Row: {
          activity_count: number | null
          county_name: string | null
          display_name: string | null
          email_primary: string | null
          first_name: string | null
          is_donor: boolean | null
          is_supporter: boolean | null
          is_volunteer: boolean | null
          is_voter: boolean | null
          last_activity_at: string | null
          last_name: string | null
          person_id: string | null
          phone_primary: string | null
          primary_county_id: number | null
          primary_precinct_label: string | null
        }
        Relationships: [
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "people_primary_county_id_fkey"
            columns: ["primary_county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
        ]
      }
      people_match_review_v: {
        Row: {
          created_at: string | null
          id: string | null
          left_source_record_key: string | null
          left_source_system: string | null
          left_source_table: string | null
          match_reasons: Json | null
          match_score: number | null
          match_status: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          right_source_record_key: string | null
          right_source_system: string | null
          right_source_table: string | null
          suggested_person_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          left_source_record_key?: string | null
          left_source_system?: string | null
          left_source_table?: string | null
          match_reasons?: Json | null
          match_score?: number | null
          match_status?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          right_source_record_key?: string | null
          right_source_system?: string | null
          right_source_table?: string | null
          suggested_person_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          left_source_record_key?: string | null
          left_source_system?: string | null
          left_source_table?: string | null
          match_reasons?: Json | null
          match_score?: number | null
          match_status?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          right_source_record_key?: string | null
          right_source_system?: string | null
          right_source_table?: string | null
          suggested_person_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "person_match_candidates_suggested_person_id_fkey"
            columns: ["suggested_person_id"]
            isOneToOne: false
            referencedRelation: "compliance_person_channel_status_v"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_match_candidates_suggested_person_id_fkey"
            columns: ["suggested_person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_match_candidates_suggested_person_id_fkey"
            columns: ["suggested_person_id"]
            isOneToOne: false
            referencedRelation: "people_master_v"
            referencedColumns: ["person_id"]
          },
        ]
      }
      precinct_results: {
        Row: {
          candidate_name: string | null
          contest_id: number | null
          county: string | null
          county_id: number | null
          created_at: string | null
          geography_type: string | null
          id: number | null
          location_label: string | null
          location_raw: string | null
          party: string | null
          precinct: string | null
          race_id: number | null
          reporting_district_code: string | null
          reporting_district_type: string | null
          result_scope: string | null
          row_payload: Json | null
          source_file_name: string | null
          source_precinct_code: string | null
          source_precinct_name: string | null
          total_votes_at_location: number | null
          updated_at: string | null
          vote_pct: number | null
          vote_share_pct: number | null
          vote_total: number | null
          votes: number | null
        }
        Insert: {
          candidate_name?: string | null
          contest_id?: number | null
          county?: string | null
          county_id?: number | null
          created_at?: string | null
          geography_type?: string | null
          id?: number | null
          location_label?: string | null
          location_raw?: string | null
          party?: string | null
          precinct?: string | null
          race_id?: number | null
          reporting_district_code?: string | null
          reporting_district_type?: string | null
          result_scope?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          source_precinct_code?: string | null
          source_precinct_name?: string | null
          total_votes_at_location?: number | null
          updated_at?: string | null
          vote_pct?: number | null
          vote_share_pct?: number | null
          vote_total?: number | null
          votes?: number | null
        }
        Update: {
          candidate_name?: string | null
          contest_id?: number | null
          county?: string | null
          county_id?: number | null
          created_at?: string | null
          geography_type?: string | null
          id?: number | null
          location_label?: string | null
          location_raw?: string | null
          party?: string | null
          precinct?: string | null
          race_id?: number | null
          reporting_district_code?: string | null
          reporting_district_type?: string | null
          result_scope?: string | null
          row_payload?: Json | null
          source_file_name?: string | null
          source_precinct_code?: string | null
          source_precinct_name?: string | null
          total_votes_at_location?: number | null
          updated_at?: string | null
          vote_pct?: number | null
          vote_share_pct?: number | null
          vote_total?: number | null
          votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "election_results_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "election_contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_intel_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "cd2_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "county_detail_export_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "diagnostics_vr_county_coverage"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "geo_counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "kpi_county_snapshot_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "statewide_county_master_v"
            referencedColumns: ["county_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_city_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "analytics_county_election_totals"
            referencedColumns: ["race_id"]
          },
          {
            foreignKeyName: "election_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      raw_vr_county_mapped: {
        Row: {
          congressional_district: string | null
          county: string | null
          county_normalized: string | null
          created_at: string | null
          date_last_voted: string | null
          date_of_birth: string | null
          date_of_party_affiliation: string | null
          date_of_registration: string | null
          id: number | null
          import_batch: string | null
          imported_at: string | null
          key_registrant: string | null
          mapped_county_id: number | null
          name_first: string | null
          name_last: string | null
          name_middle: string | null
          name_suffix: string | null
          party: string | null
          precinct_name: string | null
          registrant_reason: string | null
          registrant_status: string | null
          res_address_nbr: string | null
          res_address_nbr_suffix: string | null
          res_city: string | null
          res_physical_address: string | null
          res_state: string | null
          res_unit_nbr: string | null
          res_zip4: string | null
          res_zip5: string | null
          source_file_name: string | null
          state_representative_district: string | null
          state_senate_district: string | null
          street_dir_prefix: string | null
          street_dir_suffix: string | null
          street_name: string | null
          street_type: string | null
          unit_type: string | null
          voter_id: string | null
        }
        Relationships: []
      }
      statewide_city_master_v: {
        Row: {
          census_place_total_population: number | null
          census_place_voting_age_population: number | null
          city_estimated_total_population: number | null
          city_estimated_voting_age_population: number | null
          city_expected_turnout_votes: number | null
          city_id: number | null
          city_key: string | null
          city_name: string | null
          city_possible_dem_voters: number | null
          city_share_of_county_vr_pct: number | null
          city_target_votes_at_proportional_share: number | null
          city_vr_unique_voters: number | null
          county_dem_baseline_pct: number | null
          county_id: number | null
          county_name: string | null
          county_priority_score: number | null
          county_registration_rate_pct: number | null
          county_turnout_rate_pct: number | null
          place_fips: string | null
        }
        Relationships: []
      }
      statewide_county_master_v: {
        Row: {
          acs_source_year: number | null
          asian_population: number | null
          bachelors_or_higher: number | null
          bachelors_or_higher_rate_pct: number | null
          black_population: number | null
          casino_signers: number | null
          casino_signers_per_1k_vr: number | null
          county_civic_activity_score: number | null
          county_democratic_baseline_score: number | null
          county_fips: string | null
          county_id: number | null
          county_name: string | null
          county_priority_score: number | null
          county_registration_opportunity_score: number | null
          county_target_votes_at_proportional_share: number | null
          county_turnout_opportunity_score: number | null
          county_vote_share_of_state: number | null
          county_votes_needed_for_majority_of_expected_turnout: number | null
          dem_pct_2022_governor: number | null
          dem_pct_2024_president: number | null
          dem_pct_2026_sos: number | null
          dem_swing_2022_to_2024: number | null
          dem_swing_2024_to_2026: number | null
          expected_democratic_baseline_votes: number | null
          expected_turnout_votes: number | null
          hispanic_population: number | null
          marijuana_signers: number | null
          marijuana_signers_per_1k_vr: number | null
          median_household_income: number | null
          owner_occupied_housing: number | null
          pct_asian_population: number | null
          pct_black_population: number | null
          pct_hispanic_population: number | null
          pct_white_population: number | null
          poverty_population: number | null
          poverty_rate_pct: number | null
          ranked_choice_signers: number | null
          ranked_choice_signers_per_1k_vr: number | null
          redistricting_signers: number | null
          redistricting_signers_per_1k_vr: number | null
          registration_rate_pct: number | null
          registrations_2025_11_to_2026_11_unique_voters: number | null
          renter_occupied_housing: number | null
          renter_share_pct: number | null
          state_fips: string | null
          statewide_expected_turnout_votes: number | null
          statewide_vote_target: number | null
          statewide_vr_unique_voters: number | null
          total_population: number | null
          turnout_rate_pct: number | null
          vh_unique_voters: number | null
          voting_age_population: number | null
          vr_unique_voters: number | null
          vr_voters: number | null
          white_population: number | null
        }
        Relationships: []
      }
      statewide_precinct_priority_v: {
        Row: {
          county_id: number | null
          county_name: string | null
          dem_pct_2022_governor: number | null
          dem_pct_2024_president: number | null
          dem_pct_2026_primary: number | null
          dem_swing_2022_to_2024: number | null
          dem_swing_2024_to_2026: number | null
          precinct_baseline_score: number | null
          precinct_label: string | null
          precinct_priority_score: number | null
          precinct_size_score: number | null
          precinct_turnout_gap_score: number | null
          registered_voters: number | null
          total_votes_2022_governor: number | null
          total_votes_2024_president: number | null
          total_votes_2026_primary: number | null
          turnout_rate_pct: number | null
          turnout_voters: number | null
        }
        Relationships: []
      }
      statewide_voter_reengagement_v: {
        Row: {
          county_id: number | null
          county_name: string | null
          county_priority_score: number | null
          county_turnout_rate_pct: number | null
          key_registrant: string | null
          outreach_bucket: string | null
          petition_casino: boolean | null
          petition_marijuana: boolean | null
          petition_ranked_choice: boolean | null
          petition_redistricting: boolean | null
          precinct_label: string | null
          precinct_priority_score: number | null
          precinct_turnout_rate_pct: number | null
          reengagement_score: number | null
          registrant_status: string | null
          voted_2022_general: boolean | null
          voted_2024_general: boolean | null
          voted_2026_primary: boolean | null
          voted_2026_runoff: boolean | null
          voted_any_primary: boolean | null
          voter_id: string | null
        }
        Relationships: []
      }
      vh_events: {
        Row: {
          election_column: string | null
          key_registrant: string | null
          participation_raw: string | null
          voter_id: string | null
        }
        Relationships: []
      }
      vh_events_clean: {
        Row: {
          election_column: string | null
          key_registrant: string | null
          participated: number | null
          participation_raw: string | null
          voter_id: string | null
        }
        Relationships: []
      }
      voter_behavior_signals: {
        Row: {
          signed_casino: number | null
          signed_marijuana: number | null
          signed_ranked_choice: number | null
          signed_redistricting: number | null
          voter_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_ward_leaderboard: {
        Args: { p_limit?: number; p_ward_slug: string }
        Returns: {
          commitment_goal: number
          created_at: string
          direct_recruits: number
          display_name: string
          downstream_total: number
          id: string
          referral_code: string
        }[]
      }
      get_ward_team_stats: { Args: { p_ward_slug: string }; Returns: Json }
      is_campaign_admin: { Args: { check_uid: string }; Returns: boolean }
      normalize_geo_name: { Args: { value: string }; Returns: string }
      organizer_descendant_count: { Args: { p_id: string }; Returns: number }
      search_voter_directory: {
        Args: { p_limit: number; p_q: string; p_ward: string }
        Returns: {
          address_line: string | null
          city: string | null
          created_at: string
          display_name: string
          email: string | null
          id: string
          phone: string | null
          ward_slug: string
          zip: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "voter_directory_entries"
          isOneToOne: false
          isSetofReturn: true
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
