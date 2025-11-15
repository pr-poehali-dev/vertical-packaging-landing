import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Index() {
  const [formData, setFormData] = useState({
    product: '',
    dosage: '',
    speed: '',
    packageType: '',
    phone: '',
    email: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Package" className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">ПакТех</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#equipment" className="text-sm font-medium hover:text-primary transition-colors">Оборудование</a>
            <a href="#packages" className="text-sm font-medium hover:text-primary transition-colors">Пакеты</a>
            <a href="#options" className="text-sm font-medium hover:text-primary transition-colors">Опции</a>
            <a href="#service" className="text-sm font-medium hover:text-primary transition-colors">Сервис</a>
            <a href="#cases" className="text-sm font-medium hover:text-primary transition-colors">Кейсы</a>
            <Button size="sm" className="bg-accent hover:bg-accent/90">Получить расчет</Button>
          </nav>
        </div>
      </header>

      <section id="hero" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                Вертикальные фасовочные автоматы под ваш продукт за 15 дней
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Производительность до 60 пак/мин. Точность фасовки до 1%. Надежная запайка швов и работа с BOPP, барьерными пленками и ламинированной бумагой. Бесплатный запуск и тест в демозале
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: 'Gauge', text: 'До 60 пак/мин' },
                  { icon: 'Settings', text: 'Автонастройка' },
                  { icon: 'Wind', text: 'MAP/вакуум' },
                  { icon: 'Award', text: 'CE, ISO 9001' },
                  { icon: 'ShieldCheck', text: 'Гарантия 2 года' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm border border-border hover-scale">
                    <Icon name={item.icon} className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  <Icon name="Calculator" className="w-5 h-5 mr-2" />
                  Получить расчет за 15 минут
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Calendar" className="w-5 h-5 mr-2" />
                  Записаться в демозал
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Download" className="w-5 h-5 mr-2" />
                  Скачать каталог
                </Button>
              </div>
            </div>

            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle>Получить расчет за 15 минут</CardTitle>
                <CardDescription>Заполните форму и получите точный расчет стоимости</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="product">Продукт</Label>
                    <Input 
                      id="product" 
                      placeholder="Например: орехи, крупы, специи"
                      value={formData.product}
                      onChange={(e) => setFormData({...formData, product: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dosage">Дозировка (г/мл)</Label>
                      <Input 
                        id="dosage" 
                        placeholder="100"
                        value={formData.dosage}
                        onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="speed">Скорость (пак/мин)</Label>
                      <Input 
                        id="speed" 
                        placeholder="40"
                        value={formData.speed}
                        onChange={(e) => setFormData({...formData, speed: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="packageType">Тип пакета</Label>
                    <Select value={formData.packageType} onValueChange={(value) => setFormData({...formData, packageType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pillow">Пакет «подушка»</SelectItem>
                        <SelectItem value="gusset">С боковыми фальцами</SelectItem>
                        <SelectItem value="brick">Пакет-брикет</SelectItem>
                        <SelectItem value="sachet">Саше</SelectItem>
                        <SelectItem value="stick">Стик</SelectItem>
                        <SelectItem value="doypack">Дой-пак</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="mail@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="consent" 
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
                    />
                    <label htmlFor="consent" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                      Согласен на обработку персональных данных
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                    Получить расчет
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="packages" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Любой тип пакета под задачу вашего продукта
            </h2>
            <p className="text-lg text-muted-foreground">
              Настраиваем формирующие комплекты и швы под ваши требования
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Пакет «подушка»', desc: 'Классический формат для снеков, чипсов, конфет', icon: 'Package' },
              { name: 'Пакет с боковыми фальцами', desc: 'Увеличенный объем для кофе, круп', icon: 'Box' },
              { name: 'Пакет-брикет', desc: 'Квадро/стабило с плоским дном для стабильности', icon: 'Cuboid' },
              { name: 'Саше (3/4-шов)', desc: 'Порционные пакеты для специй, сахара, соусов', icon: 'PackageOpen' },
              { name: 'Стик (многорядный)', desc: 'Узкие пакеты для жидкостей и порошков', icon: 'AlignVerticalJustifyCenter' },
              { name: 'Дой-пак', desc: 'Из рулонной пленки с zip-замком и еврослотом', icon: 'ShoppingBag' },
            ].map((pkg, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={pkg.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Материалы: BOPP, многослойные барьерные пленки, ламинированная бумага
            </p>
            <Button variant="outline" size="lg">
              Подобрать формат и цену
            </Button>
          </div>
        </div>
      </section>

      <section id="dosators" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Точная дозировка до 1% — под любой продукт
            </h2>
            <p className="text-lg text-muted-foreground">
              Подбираем дозатор под физические свойства продукта и требуемую скорость
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { type: 'Весовой линейный', products: 'Крупные фракции, орехи, сухофрукты', icon: 'Scale' },
              { type: 'Весовой мультиголовочный', products: 'Снеки, пельмени, заморозка, конфеты', icon: 'ScaleIcon' },
              { type: 'Объемный (чашечный)', products: 'Крупы, рис, сахар', icon: 'Cup' },
              { type: 'Шнековый', products: 'Порошки, кофе, какао, протеины, специи', icon: 'Cog' },
              { type: 'Поршневой/насосный', products: 'Соусы, пасты, майонез, шампуни', icon: 'Droplet' },
              { type: 'Штучный/счетчик', products: 'Таблетки, капсулы, метизы', icon: 'Hash' },
            ].map((dosator, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={dosator.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{dosator.type}</CardTitle>
                  <CardDescription className="text-sm">{dosator.products}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Icon name="Settings2" className="w-8 h-8 text-accent flex-shrink-0" />
                <p className="text-lg">
                  <span className="font-semibold">Автоматическая настройка</span> веса и параметров пакета с панели оператора
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Подобрать дозатор и получить КП
            </Button>
          </div>
        </div>
      </section>

      <section id="performance" className="py-16 md:py-24 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Стабильная работа 24/7 при скорости до 60 пак/мин
            </h2>
            <p className="text-lg opacity-90">
              Минимум брака и перевесов благодаря точной дозировке и надежной запайке швов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: 'Lock', title: 'Надежная герметизация', text: 'Сохранение свежести продукта' },
              { icon: 'MonitorPlay', title: 'Интуитивный интерфейс', text: 'Обучение за 1 смену' },
              { icon: 'Wrench', title: 'Легкое обслуживание', text: 'Простая эксплуатация' },
              { icon: 'Shield', title: 'Устойчивость к условиям', text: 'Исполнение под отрасль' },
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-3">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name={item.icon} className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm opacity-90">{item.text}</p>
              </div>
            ))}
          </div>

          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Icon name="TrendingUp" className="w-8 h-8 flex-shrink-0 text-accent" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Реальный результат</h3>
                  <p className="opacity-90">
                    На линии орехов снизили перевес на 22% и расход пленки на 12% за 2 недели
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90">
              Узнать, как повысить скорость без потери качества
            </Button>
          </div>
        </div>
      </section>

      <section id="options" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Опции под ваш процесс — без лишней сложности
            </h2>
            <p className="text-lg text-muted-foreground">
              Готовые модули интегрируются на этапе поставки
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Газовая среда (MAP)', icon: 'Wind' },
              { name: 'Откачка воздуха', icon: 'Minus' },
              { name: 'Впрыск спирта', icon: 'Droplets' },
              { name: 'Принтеры маркировки', icon: 'Printer' },
              { name: 'Аппликаторы этикетки', icon: 'Tag' },
              { name: 'Перфорация пленки', icon: 'CircleDot' },
              { name: 'Чеквейер', icon: 'Weight' },
              { name: 'Металлоискатель', icon: 'ScanSearch' },
              { name: 'Удаленный доступ', icon: 'Monitor' },
            ].map((option, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name={option.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-medium">{option.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Собрать комплектацию и получить смету
            </Button>
          </div>
        </div>
      </section>

      <section id="industries" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Пищевые и непищевые продукты — один стандарт качества
            </h2>
            <p className="text-lg text-muted-foreground">
              Готовые рецепты настроек для вашей категории
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: 'Снеки/чипсы/кондитерка', speed: 'до 60 пак/мин', type: 'пакет подушка', icon: 'Cookie' },
              { category: 'Крупы/сахар/рис', speed: 'стабильная геометрия', type: 'пакет-брикет', icon: 'Wheat' },
              { category: 'Порошки/специи/кофе', speed: 'шнековый дозатор', type: 'барьерные пленки', icon: 'Coffee' },
              { category: 'Заморозка/пельмени', speed: 'мультиголовочный', type: 'усиленные швы', icon: 'Snowflake' },
              { category: 'Соусы/майонез', speed: 'поршневой дозатор', type: 'саше/дой-пак', icon: 'Soup' },
              { category: 'Метизы/таблетки', speed: 'штучный учет', type: 'саше/стик', icon: 'Pill' },
            ].map((industry, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={industry.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{industry.category}</CardTitle>
                  <div className="space-y-1">
                    <Badge variant="secondary">{industry.speed}</Badge>
                    <Badge variant="outline">{industry.type}</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              Запросить образцы пакетов и тест
            </Button>
          </div>
        </div>
      </section>

      <section id="service" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Запуск под ключ и поддержка на всей территории России
            </h2>
            <p className="text-lg text-muted-foreground">
              Несем ответственность за результат — от подбора до сервисного сопровождения
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Гарантия до 2 лет', icon: 'ShieldCheck' },
              { title: 'Бесплатные ПНР', icon: 'CheckCircle2' },
              { title: 'Доставка по России и СНГ', icon: 'Truck' },
              { title: 'Большой склад запчастей', icon: 'Warehouse' },
              { title: 'Сеть сервисных центров', icon: 'MapPin' },
              { title: 'Проверенные производители', icon: 'Award' },
              { title: 'Работа 24/7', icon: 'Clock' },
              { title: 'CE, ISO 9001', icon: 'Medal' },
            ].map((service, idx) => (
              <Card key={idx} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name={service.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-medium">{service.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              Узнать условия сервиса
            </Button>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Честная стоимость и гибкие условия оплаты
            </h2>
            <p className="text-lg text-muted-foreground">
              Смета за 1 день. Лизинг и акции — по запросу
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Привлекательные цены', desc: 'Акции и скидки', icon: 'Percent' },
              { title: 'Лизинг', desc: 'От партнеров банков', icon: 'CreditCard' },
              { title: 'Прозрачная смета', desc: 'Полная стоимость', icon: 'FileText' },
            ].map((item, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto shadow-xl border-2">
            <CardHeader>
              <CardTitle>Получить расчет и условия лизинга</CardTitle>
              <CardDescription>Детальная информация о вашем проекте</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Продукт</Label>
                    <Input placeholder="Орехи, крупы..." />
                  </div>
                  <div>
                    <Label>Дозировка (г/мл)</Label>
                    <Input placeholder="100" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Емкость пакета</Label>
                    <Input placeholder="500" />
                  </div>
                  <div>
                    <Label>Требуемая скорость</Label>
                    <Input placeholder="40 пак/мин" />
                  </div>
                </div>

                <div>
                  <Label>Тип пленки</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип пленки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bopp">BOPP</SelectItem>
                      <SelectItem value="barrier">Барьерная многослойная</SelectItem>
                      <SelectItem value="paper">Ламинированная бумага</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Опции</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {['MAP', 'Вакуум', 'Впрыск спирта', 'Печать', 'Этикетка', 'Перфорация'].map((opt) => (
                      <div key={opt} className="flex items-center space-x-2">
                        <Checkbox id={opt} />
                        <label htmlFor={opt} className="text-sm cursor-pointer">{opt}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Имя</Label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <Input placeholder="+7 (999) 123-45-67" />
                  </div>
                </div>

                <div>
                  <Label>E-mail</Label>
                  <Input type="email" placeholder="mail@example.com" />
                </div>

                <div>
                  <Label>Файл ТЗ (необязательно)</Label>
                  <Input type="file" />
                </div>

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                  Получить расчет и условия лизинга
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="cases" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Реальные результаты клиентов
            </h2>
            <p className="text-lg text-muted-foreground">
              Цифры до/после внедрения
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Package2" className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Орехи и снеки</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Поставили автомат с мультиголовочным дозатором
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Скорость:</span>
                    <Badge className="bg-accent">58 пак/мин</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Снижение перевеса:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">-20%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Окупаемость:</span>
                    <Badge variant="outline">7 месяцев</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Wheat" className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Крупы</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Пакет-брикет с объемным дозатором
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Снижение расхода пленки:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">-10%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Рост производительности:</span>
                    <Badge className="bg-accent">+30%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Качество запайки:</span>
                    <Badge variant="outline">100% герметичность</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Хочу такой же результат
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Частые вопросы
            </h2>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {[
              { q: 'Срок поставки и запуска?', a: 'От 15 дней. Пуско-наладочные работы бесплатно.' },
              { q: 'Какие пленки подходят?', a: 'BOPP, барьерные многослойные пленки, ламинированная бумага.' },
              { q: 'Как достигается точность до 1%?', a: 'Подбор дозатора под продукт и автоматическая настройка рецептов.' },
              { q: 'Нужна ли подготовка воздуха?', a: 'Да, требования к компрессору и осушению предоставим в технической документации.' },
              { q: 'Какие гарантии и сервис?', a: 'Гарантия до 2 лет, сервисная сеть по РФ, большой склад запчастей.' },
              { q: 'Можно протестировать продукт?', a: 'Да, бесплатный тест в демозале. Записывайтесь на удобное время.' },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="cta" className="py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Получите расчет и образцы пакетов за 24 часа
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Подберем оборудование, проведем тест в демозале и рассчитаем окупаемость
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Icon name="Send" className="w-5 h-5 mr-2" />
              Оставить заявку
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
              <Icon name="Calendar" className="w-5 h-5 mr-2" />
              Записаться в демозал
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
              <Icon name="Phone" className="w-5 h-5 mr-2" />
              Позвонить
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Icon name="Phone" className="w-4 h-4" />
              <span>+7 (495) 123-45-67</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" className="w-4 h-4" />
              <span>info@paktech.ru</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" className="w-4 h-4" />
              <span>Москва, ул. Промышленная, д. 10</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Package" className="w-6 h-6" />
                <span className="text-xl font-bold">ПакТех</span>
              </div>
              <p className="text-sm opacity-80">
                Профессиональное фасовочное оборудование с 2010 года
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Оборудование</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#packages" className="hover:opacity-100">Типы пакетов</a></li>
                <li><a href="#dosators" className="hover:opacity-100">Дозаторы</a></li>
                <li><a href="#options" className="hover:opacity-100">Опции</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#service" className="hover:opacity-100">Сервис</a></li>
                <li><a href="#cases" className="hover:opacity-100">Кейсы</a></li>
                <li><a href="#faq" className="hover:opacity-100">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>+7 (495) 123-45-67</li>
                <li>info@paktech.ru</li>
                <li>Москва, ул. Промышленная, 10</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between items-center gap-4 text-sm opacity-80">
            <p>© 2024 ПакТех. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100">Политика конфиденциальности</a>
              <a href="#" className="hover:opacity-100">Согласие на обработку ПДн</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
