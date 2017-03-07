using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocalDbReader
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var dbFileName = "Movie.mdf";
                var path = Path.Combine(Path.GetDirectoryName(Path.GetDirectoryName(new Uri(typeof(Program).Assembly.CodeBase).LocalPath)), dbFileName);

                var dsn = $@"Data Source=(LocalDB)\MSSQLLocalDB;Integrated Security=True;AttachDbFilename={path};MultipleActiveResultSets=True;ApplicationIntent=ReadOnly";

                using (var connection = new SqlConnection(dsn))
                {
                    connection.Open();

                    var tables = connection.GetSchema("Tables");

                    using (var writer = new StreamWriter(Path.ChangeExtension(path, ".json")))
                    using (var json = new JsonTextWriter(writer))
                    {
                        json.WriteStartObject();

                        foreach (var table in tables.Rows.Cast<DataRow>().Where(t => (string)t["TABLE_TYPE"] == "BASE TABLE").Select(t => (string)t["TABLE_NAME"]))
                        {
                            json.WritePropertyName(table, true);
                            json.WriteStartArray();

                            using (var cmd = connection.CreateCommand())
                            {
                                cmd.CommandText = $"SELECT * FROM \"{table}\"";

                                using (var reader = cmd.ExecuteReader())
                                    while (reader.Read())
                                    {
                                        json.WriteStartObject();

                                        for (var i = 0; i < reader.FieldCount; i++)
                                        {
                                            json.WritePropertyName(reader.GetName(i), true);
                                            json.WriteValue(reader.GetValue(i));
                                        }

                                        json.WriteEndObject();
                                    }
                            }

                            json.WriteEndArray();
                        }

                        json.WriteEndObject();
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            Console.WriteLine("Done");
            Console.ReadLine();
        }
    }
}
