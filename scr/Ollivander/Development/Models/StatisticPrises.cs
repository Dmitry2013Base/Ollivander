namespace Development.Models
{
    public class StatisticPrises
    {
        public int Status { get; set; }
        public bool Group { get; set; }
        public DateOnly DateStart { get; set; }
        public DateOnly DateFinish { get; set; }
        public int Limit { get; set; }
    }
}
