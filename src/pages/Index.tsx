import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Index() {
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://cdn.poehali.dev/files/fec45e66-45c2-4c6a-8b0f-74188df1e0db.png" alt="ПакТех" className="h-8" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#equipment" className="text-sm font-medium hover:text-primary transition-colors">Оборудование</a>
            <a href="#packages" className="text-sm font-medium hover:text-primary transition-colors">Пакеты</a>
            <a href="#options" className="text-sm font-medium hover:text-primary transition-colors">Опции</a>
            <a href="#service" className="text-sm font-medium hover:text-primary transition-colors">Сервис</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={() => setShowModal(true)}>Получить расчет</Button>
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
                  { icon: 'ShieldCheck', text: 'Гарантия до 2х лет' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm border border-border hover-scale">
                    <Icon name={item.icon} className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => setShowModal(true)}>
                  <Icon name="Calculator" className="w-5 h-5 mr-2" />
                  Получить расчет
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowModal(true)}>
                  <Icon name="Calendar" className="w-5 h-5 mr-2" />
                  Записаться в демозал
                </Button>
              </div>
            </div>

            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle>Получить расчет</CardTitle>
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
              { name: 'Пакет «подушка»', desc: 'Классический формат для снеков, чипсов, конфет', img: 'https://placehold.co/120x120/e0e7ff/4f46e5?text=Подушка' },
              { name: 'Пакет с боковыми фальцами', desc: 'Увеличенный объем для кофе, круп', img: 'https://placehold.co/120x120/e0e7ff/4f46e5?text=Фальцы' },
              { name: 'Пакет-брикет', desc: 'Квадро/стабило с плоским дном для стабильности', img: 'https://placehold.co/120x120/e0e7ff/4f46e5?text=Брикет' },
              { name: 'Саше (3/4-шов)', desc: 'Порционные пакеты для специй, сахара, соусов', img: 'https://placehold.co/120x120/e0e7ff/4f46e5?text=Саше' },
              { name: 'Стик (многорядный)', desc: 'Узкие пакеты для жидкостей и порошков', img: 'https://placehold.co/120x120/e0e7ff/4f46e5?text=Стик' },
              { name: 'Дой-пак', desc: 'Из рулонной пленки с zip-замком и еврослотом', img: 'https://placehold.co/120x120/e0e7ff/4f46e5?text=Дой-пак' },
            ].map((pkg, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow hover-scale">
                <CardHeader>
                  <div className="w-24 h-24 rounded-lg overflow-hidden mb-4 mx-auto">
                    <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover" />
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
            <Button variant="outline" size="lg" onClick={() => setShowModal(true)}>
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
              { type: 'Весовой линейный', products: 'Крупные фракции, орехи, сухофрукты', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Весовой' },
              { type: 'Весовой мультиголовочный', products: 'Снеки, пельмени, заморозка, конфеты', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Мульти' },
              { type: 'Объемный (чашечный)', products: 'Крупы, рис, сахар', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Объемный' },
              { type: 'Шнековый', products: 'Порошки, кофе, какао, протеины, специи', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Шнековый' },
              { type: 'Поршневой/насосный', products: 'Соусы, пасты, майонез, шампуни', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Поршневой' },
              { type: 'Штучный/счетчик', products: 'Таблетки, капсулы, метизы', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Счетчик' },
            ].map((dosator, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-20 h-20 rounded-lg overflow-hidden mb-4 mx-auto">
                    <img src={dosator.img} alt={dosator.type} className="w-full h-full object-cover" />
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
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => setShowModal(true)}>
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

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90" onClick={() => setShowModal(true)}>
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
              { name: 'Газовая среда (MAP)', img: 'https://placehold.co/100x100/fef3c7/d97706?text=MAP' },
              { name: 'Откачка воздуха', img: 'https://placehold.co/100x100/fef3c7/d97706?text=Вакуум' },
              { name: 'Впрыск спирта', img: 'https://placehold.co/100x100/fef3c7/d97706?text=Спирт' },
              { name: 'Принтеры маркировки', img: 'https://placehold.co/100x100/fef3c7/d97706?text=Принтер' },
              { name: 'Аппликаторы этикетки', img: 'https://placehold.co/100x100/fef3c7/d97706?text=Этикетка' },
              { name: 'Перфорация пленки', img: 'https://placehold.co/100x100/fef3c7/d97706?text=Перфорация' },
              { name: 'Чеквейер', img: 'https://placehold.co/100x100/fef3c7/d97706?text=Чеквейер' },
              { name: 'Металлоискатель', img: 'https://placehold.co/100x100/fef3c7/d97706?text=Металл' },
              { name: 'Удаленный доступ', img: 'https://placehold.co/100x100/fef3c7/d97706?text=Remote' },
            ].map((option, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden mx-auto mb-3">
                    <img src={option.img} alt={option.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-medium">{option.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => setShowModal(true)}>
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
              { category: 'Снеки/чипсы/кондитерка', speed: 'до 60 пак/мин', type: 'пакет подушка', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Снеки' },
              { category: 'Крупы/сахар/рис', speed: 'стабильная геометрия', type: 'пакет-брикет', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Крупы' },
              { category: 'Порошки/специи/кофе', speed: 'шнековый дозатор', type: 'барьерные пленки', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Порошки' },
              { category: 'Заморозка/пельмени', speed: 'мультиголовочный', type: 'усиленные швы', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Заморозка' },
              { category: 'Соусы/майонез', speed: 'поршневой дозатор', type: 'саше/дой-пак', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Соусы' },
              { category: 'Метизы/таблетки', speed: 'штучный учет', type: 'саше/стик', img: 'https://placehold.co/100x100/dbeafe/1e40af?text=Метизы' },
            ].map((industry, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-20 h-20 rounded-lg overflow-hidden mb-4 mx-auto">
                    <img src={industry.img} alt={industry.category} className="w-full h-full object-cover" />
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
              { title: 'Гарантия до 2х лет', icon: 'ShieldCheck' },
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
            <Button size="lg" variant="outline" onClick={() => setShowModal(true)}>
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

          <div className="text-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => setShowModal(true)}>
              Получить расчет и условия лизинга
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24 bg-muted/30">
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
              { q: 'Какие гарантии и сервис?', a: 'Гарантия до 2х лет, большой склад запчастей.' },
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
            Получите расчет за 24 часа
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Подберем оборудование, проведем тест в демозале и рассчитаем окупаемость
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => setShowModal(true)}>
              <Icon name="Send" className="w-5 h-5 mr-2" />
              Оставить заявку
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10" onClick={() => setShowModal(true)}>
              <Icon name="Calendar" className="w-5 h-5 mr-2" />
              Записаться в демозал
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10" asChild>
              <a href="tel:88005337522">
                <Icon name="Phone" className="w-5 h-5 mr-2" />
                Позвонить
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Icon name="Phone" className="w-4 h-4" />
              <a href="tel:88005337522" className="hover:underline">8 800 533-75-22</a>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" className="w-4 h-4" />
              <span>info@paktech.ru</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img src="https://cdn.poehali.dev/files/fec45e66-45c2-4c6a-8b0f-74188df1e0db.png" alt="ПакТех" className="h-8 brightness-0 invert" />
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
                <li><a href="#pricing" className="hover:opacity-100">Цены</a></li>
                <li><a href="#faq" className="hover:opacity-100">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="tel:88005337522" className="hover:opacity-100">8 800 533-75-22</a></li>
                <li>info@paktech.ru</li>
                <li>Москва, ш. Энтузиастов, д. 56, стр. 32, офис 115</li>
                <li>Новосибирск, ул. Электрозаводская, 2 к1, офис 304, 314</li>
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

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Получить расчет</DialogTitle>
            <DialogDescription>
              Заполните форму и получите точный расчет стоимости
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="modal-product">Продукт</Label>
              <Input 
                id="modal-product" 
                placeholder="Например: орехи, крупы, специи"
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="modal-dosage">Дозировка (г/мл)</Label>
                <Input 
                  id="modal-dosage" 
                  placeholder="100"
                  value={formData.dosage}
                  onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="modal-speed">Скорость (пак/мин)</Label>
                <Input 
                  id="modal-speed" 
                  placeholder="40"
                  value={formData.speed}
                  onChange={(e) => setFormData({...formData, speed: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="modal-packageType">Тип пакета</Label>
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
              <Label htmlFor="modal-phone">Телефон</Label>
              <Input 
                id="modal-phone" 
                type="tel" 
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="modal-email">E-mail</Label>
              <Input 
                id="modal-email" 
                type="email" 
                placeholder="mail@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="modal-consent" 
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
              />
              <label htmlFor="modal-consent" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                Согласен на обработку персональных данных
              </label>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
              Получить расчет
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
