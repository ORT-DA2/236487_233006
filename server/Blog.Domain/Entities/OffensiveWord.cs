namespace Blog.Domain;

public class OffensiveWord
{
    public int Id {get; set;}
    public string Word { get; set; }

    public OffensiveWord() { }

    public void UpdateAttributes(OffensiveWord ow)
    {
        Word = ow.Word;
    }
}
