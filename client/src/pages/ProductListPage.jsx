import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]


  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        // if (responseData.page == 1) {
        //   setData(responseData.data)
        // } else {
        //   setData([...data, ...responseData.data])
        // }
        setData(prev => page === 1 ? responseData.data : [...prev, ...responseData.data])

        // setTotalPage(responseData.totalCount)
        setTotalPage(Math.ceil(responseData.totalCount / 8))

      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params, page])


  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className='sticky top-24 lg:top-20'>
<div className='container sticky top-24 mx-auto grid grid-cols-1 sm:grid-cols-[120px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        {/**sub category **/}
        <div className='h-full lg:min-h-[88vh] lg:max-h-[88vh] overflow-y-auto flex flex-col gap-1 shadow-md scrollbarCustom bg-white py-2 px-2'>
          {
            DisplaySubCatory.map((s, index) => {
               const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
              return (
                <Link
  to={link}
  key={s._id}
  className={`flex items-center gap-3 p-2 border-b hover:bg-green-100 cursor-pointer ${
    subCategoryId === s._id ? "bg-green-100" : ""
  }`}
>
  <div className="w-10 h-10 bg-white rounded flex-shrink-0">
    <img
      src={s.image}
      alt='subCategory'
      className="w-full h-full object-contain"
    />
  </div>
  <p className='text-sm font-medium truncate'>{s.name}</p>
</Link>
              
              )
            })
          }
        </div>


        {/**Product **/}
        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>

           <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 '>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        data={p}
                        key={p._id + "productSubCategory" + index}
                      />
                    )
                  })
                }
              </div>
           </div>

            {
              loading && (
                <Loading />
              )
            }
            {
  !loading && page < totalPage && (
    <div className="text-center my-4">
      <button
        onClick={() => setPage(prev => prev + 1)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Ver mais produtos
      </button>
    </div>
  )
}

          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage
