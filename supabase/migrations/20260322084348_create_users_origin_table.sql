/*
  # Create users_origin table

  1. New Tables
    - `users_origin`
      - `id` (uuid, primary key, references auth.users)
      - `birth_date` (text) - date of birth
      - `birth_time` (text) - time of birth
      - `birth_place` (text) - city, country string
      - `latitude` (numeric) - latitude coordinate
      - `longitude` (numeric) - longitude coordinate
      - `created_at` (timestamptz) - record creation time
      - `updated_at` (timestamptz) - last update time

  2. Security
    - Enable RLS on `users_origin` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to insert their own data
    - Add policy for authenticated users to update their own data
*/

CREATE TABLE IF NOT EXISTS users_origin (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  birth_date text DEFAULT '',
  birth_time text DEFAULT '',
  birth_place text DEFAULT '',
  latitude numeric DEFAULT 0,
  longitude numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users_origin ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own origin"
  ON users_origin
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own origin"
  ON users_origin
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own origin"
  ON users_origin
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
