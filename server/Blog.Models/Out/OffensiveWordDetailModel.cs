using Blog.Domain;

namespace Models;

public class OffensiveWordDetailModel
{
    public int Id { get; set; }
    
    public string Word { get; set; }
    
    public OffensiveWordDetailModel(OffensiveWord ow)
    {
        Id = ow.Id;
        Word = ow.Word;
    }
}
