namespace TesApp.Models
{
    public class Recipes
    {
        public int RecipeId { get; set; }
        public string RecipeName { get; set; }

        public List<Items> Items { get; set; }
    }
}
