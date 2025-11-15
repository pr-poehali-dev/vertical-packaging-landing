import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [isDemoModal, setIsDemoModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    product: '',
    phone: '',
    email: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Заполните обязательные поля: Имя и Телефон');
      return;
    }
    toast.success('Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');
    setShowModal(false);
    setIsDemoModal(false);
  };

  const openCalculator = () => {
    setIsDemoModal(false);
    setShowModal(true);
  };

  const openDemo = () => {
    setShowModal(false);
    setIsDemoModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://cdn.poehali.dev/files/fec45e66-45c2-4c6a-8b0f-74188df1e0db.png" alt="ПакТех" className="h-12" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#equipment" className="text-sm font-medium hover:text-primary transition-colors">Оборудование</a>
            <a href="#packages" className="text-sm font-medium hover:text-primary transition-colors">Пакеты</a>
            <a href="#options" className="text-sm font-medium hover:text-primary transition-colors">Опции</a>
            <a href="#service" className="text-sm font-medium hover:text-primary transition-colors">Сервис</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>Получить расчет</Button>
          </nav>
        </div>
      </header>

      <section id="hero" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                Вертикальные фасовочные автоматы под ваш продукт
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
                <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>
                  <Icon name="Calculator" className="w-5 h-5 mr-2" />
                  Получить расчет
                </Button>
                <Button size="lg" variant="outline" onClick={openDemo}>
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
                    <Label htmlFor="name">Имя <span className="text-red-500">*</span></Label>
                    <Input 
                      id="name" 
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="product">Продукт</Label>
                    <Input 
                      id="product" 
                      placeholder="Например: орехи, крупы, специи"
                      value={formData.product}
                      onChange={(e) => setFormData({...formData, product: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон <span className="text-red-500">*</span></Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
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
              { name: 'Пакет «подушка»', desc: 'Классический формат для снеков, чипсов, конфет', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/07950130-d534-4336-993b-1d36c5fce56f.jpg' },
              { name: 'Пакет с боковыми фальцами', desc: 'Увеличенный объем для кофе, круп', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/e7e8231a-494b-490f-8853-49e443a38ea2.jpg' },
              { name: 'Пакет-брикет', desc: 'Квадро/стабило с плоским дном для стабильности', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/66d12319-99ac-4252-b52c-68838c233955.jpg' },
              { name: 'Саше (3/4-шов)', desc: 'Порционные пакеты для специй, сахара, соусов', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/81608fce-ab16-4109-9101-15c0dbc33113.jpg' },
              { name: 'Стик (многорядный)', desc: 'Узкие пакеты для жидкостей и порошков', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/471ddd1b-0f2a-45b0-9b61-e53ada444474.jpg' },
              { name: 'Дой-пак', desc: 'Из рулонной пленки с zip-замком и еврослотом', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/e3c8852c-6e59-426c-9b96-f9d03f1976ae.jpg' },
            ].map((pkg, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow hover-scale">
                <CardHeader>
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
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
            <Button variant="outline" size="lg" onClick={openCalculator}>
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
              { type: 'Весовой линейный', products: 'Крупные фракции, орехи, сухофрукты', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/ba15cd39-ea07-4f1a-8ab7-fcfabb926de0.jpg' },
              { type: 'Весовой мультиголовочный', products: 'Снеки, пельмени, заморозка, конфеты', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/b515c22f-39ab-4b58-a0ec-6d77718b1100.jpg' },
              { type: 'Объемный (чашечный)', products: 'Крупы, рис, сахар', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/ee3ec9d3-1d20-462b-b10d-0c8020ee17a6.jpg' },
              { type: 'Шнековый', products: 'Порошки, кофе, какао, протеины, специи', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/9e042c3c-749c-41a7-b9ec-1b9d0a88c920.jpg' },
              { type: 'Поршневой/насосный', products: 'Соусы, пасты, майонез, шампуни', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/54b5b6c9-d9ee-4336-a92e-391aef8f0e1e.jpg' },
              { type: 'Штучный/счетчик', products: 'Таблетки, капсулы, метизы', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/ffd4f22f-0763-464c-9e4d-1eab2b3df108.jpg' },
            ].map((dosator, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
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
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>
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
            <Button size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90" onClick={openCalculator}>
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
              { name: 'Газовая среда (MAP)', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/4545914e-a1fd-4fe1-b1f3-3c1146396b94.jpg' },
              { name: 'Откачка воздуха', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/b549a6dd-f916-423d-9840-8e7aefea8ccd.jpg' },
              { name: 'Впрыск спирта', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/ca0677bd-f999-4b3a-846c-009904a64e26.jpg' },
              { name: 'Принтеры маркировки', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/a4105a41-e681-48d3-b38d-4da80549bcbe.jpg' },
              { name: 'Аппликаторы этикетки', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/121f6228-1c4b-4c40-84ab-c8565f3ab708.jpg' },
              { name: 'Перфорация пленки', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/f122190b-eea6-4dcc-91ec-c3f1de9649b8.jpg' },
              { name: 'Чеквейер', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/71a36b21-f65b-4edc-803e-6bda4ac6f02c.jpg' },
              { name: 'Металлоискатель', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/161e0920-2870-420a-b8fc-82586661bf6d.jpg' },
              { name: 'Удаленный доступ', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/6a7cff5b-16c9-4642-86fb-0ee3774e7a28.jpg' },
            ].map((option, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="w-full h-32 rounded-lg overflow-hidden mx-auto mb-3">
                    <img src={option.img} alt={option.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-medium">{option.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>
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
              { category: 'Снеки/чипсы/кондитерка', speed: 'до 60 пак/мин', type: 'пакет подушка', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/d7f6bf18-dc88-42f7-a66e-15d33f6eaace.jpg' },
              { category: 'Крупы/сахар/рис', speed: 'стабильная геометрия', type: 'пакет-брикет', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/bfed9f90-05b2-4871-9efe-39a022f26f10.jpg' },
              { category: 'Порошки/специи/кофе', speed: 'шнековый дозатор', type: 'барьерные пленки', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/02f48de1-9022-47d9-8017-b3b250ae21d9.jpg' },
              { category: 'Заморозка/пельмени', speed: 'мультиголовочный', type: 'усиленные швы', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/75d03e5d-fde3-4370-9b71-a68c9a8b7df6.jpg' },
              { category: 'Соусы/майонез', speed: 'поршневой дозатор', type: 'саше/дой-пак', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/3d12122b-2a9b-43e2-9aa8-813e5edfdb59.jpg' },
              { category: 'Метизы/таблетки', speed: 'штучный учет', type: 'саше/стик', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/32f9abb7-d618-4057-9d73-caefe4f81605.jpg' },
            ].map((industry, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
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
            <Button size="lg" variant="outline" onClick={openCalculator}>
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
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>
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
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={openCalculator}>
              <Icon name="Send" className="w-5 h-5 mr-2" />
              Оставить заявку
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10" onClick={openDemo}>
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
                <img src="https://cdn.poehali.dev/files/fec45e66-45c2-4c6a-8b0f-74188df1e0db.png" alt="ПакТех" className="h-12 brightness-0 invert" />
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
            <p>© 2025 Техно-Сиб. Все права защищены.</p>
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
              <Label htmlFor="modal-name">Имя <span className="text-red-500">*</span></Label>
              <Input 
                id="modal-name" 
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="modal-product">Продукт</Label>
              <Input 
                id="modal-product" 
                placeholder="Например: орехи, крупы, специи"
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="modal-phone">Телефон <span className="text-red-500">*</span></Label>
              <Input 
                id="modal-phone" 
                type="tel" 
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
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

      <Dialog open={isDemoModal} onOpenChange={setIsDemoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Записаться в демозал</DialogTitle>
            <DialogDescription>
              Заполните форму и мы свяжемся с вами для согласования времени
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="demo-name">Имя <span className="text-red-500">*</span></Label>
              <Input 
                id="demo-name" 
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="demo-phone">Телефон <span className="text-red-500">*</span></Label>
              <Input 
                id="demo-phone" 
                type="tel" 
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="demo-consent" 
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
              />
              <label htmlFor="demo-consent" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                Согласен на обработку персональных данных
              </label>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
              Записаться
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
