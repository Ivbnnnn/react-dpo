
import itemsData from '/items.json'
import { useNavigate } from "react-router-dom"
const itemsArray = Object.entries(itemsData.items);
export default function HomePage() {
    const navigate = useNavigate()
  return (
    <div className="text-mainText bg-page
    flex flex-col items-center justify-center min-h-screen gap-4">
  <div>
    Товар с таким id не найден
  </div>
  <div>
    <button
      className='px-4 py-2 bg-blue-500 text-white rounded'
      onClick={() => navigate('/')}
    >
      Вернуться на главную
    </button>
  </div>
</div>

  )
}
