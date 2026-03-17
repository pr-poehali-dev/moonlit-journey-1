import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Тактическое поле",
    description: "Рисуй схемы расстановки прямо на интерактивном поле — перемещай игроков, задавай позиции и стрелки движения.",
    icon: "target",
    badge: "Визуально",
  },
  {
    title: "Быстрый экспорт",
    description: "Отправляй готовые тактики тренеру и ребятам в один клик — картинкой или ссылкой прямо в мессенджер.",
    icon: "zap",
    badge: "Быстро",
  },
  {
    title: "Библиотека схем",
    description: "Храни все свои тактические наработки в одном месте: 4-3-3, 4-2-3-1, персональные придумки — всё под рукой.",
    icon: "link",
    badge: "Хранение",
  },
  {
    title: "Командный доступ",
    description: "Делись тактиками с друзьями и тренером по ссылке — они видят схему и могут оставлять комментарии.",
    icon: "globe",
    badge: "Команда",
  },
  {
    title: "Анимация ходов",
    description: "Показывай движение игроков в динамике — анимируй передвижения и разбирай игровые моменты пошагово.",
    icon: "brain",
    badge: "Анимация",
  },
  {
    title: "Готовые шаблоны",
    description: "Начни с популярных тактических схем и быстро адаптируй их под свой стиль игры и состав команды.",
    icon: "lock",
    badge: "Шаблоны",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans" id="features">Всё для футбольных тактик</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Инструменты, которые помогут тебе готовить разборы, удивлять тренера и объяснять идеи команде
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "brain" && "&#129504;"}
                    {feature.icon === "lock" && "&#128274;"}
                    {feature.icon === "globe" && "&#127760;"}
                    {feature.icon === "zap" && "&#9889;"}
                    {feature.icon === "link" && "&#128279;"}
                    {feature.icon === "target" && "&#127919;"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}