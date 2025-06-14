import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewType, setReviewType] = useState('product'); // 'product' or 'business'
  const [reviewForm, setReviewForm] = useState({
    productId: null,
    businessId: null,
    rating: 0,
    reviewText: '',
    media: []
  });
  const [fileUploading, setFileUploading] = useState(false);
  const [showAIProductImages, setShowAIProductImages] = useState(false);
  const [selectedAIProduct, setSelectedAIProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/user/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const ordersData = Array.isArray(response.data?.orders) ? response.data.orders : [];
        setOrders(ordersData);
        setError(null);
      } catch (error) {
        console.error('Error fetching orders:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('access_token');
          navigate('/login');
        } else {
          setError(error.response?.data?.message || 'Failed to fetch orders');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [navigate]);

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/api/user/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedOrders = orders.map(order => 
        order.order_id === orderId 
          ? { ...order, order_status: 'cancelled' } 
          : order
      );
      
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error cancelling order:', error);
      
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          alert(error.response.data?.message || 'Failed to cancel order');
        }
      } else {
        alert('Network error - please try again later');
      }
    }
  };

  const fetchAIProductImages = async (itemId) => {
    const token = localStorage.getItem('access_token');
      
      if (!token) {
        navigate('/login');
        return;
      }
  try {
    const response = await axios.get(`http://localhost:8080/api/user/orders/ai-order-images/${itemId}`,
      {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
    );
    setSelectedAIProduct({
      images: response.data.images,
      itemId: itemId
    });
    setShowAIProductImages(true);
  } catch (error) {
    console.error('Error fetching AI product images:', error);
    alert('Failed to load AI product images');
  }
};

  const handleReviewSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    if (reviewForm.productId) formData.append('product_id', reviewForm.productId);
    if (reviewForm.businessId) formData.append('business_id', reviewForm.businessId);
    if (selectedOrder.ai_order && reviewForm.itemId) formData.append('item_id', reviewForm.itemId);
    formData.append('rating', reviewForm.rating);
    formData.append('review_text', reviewForm.reviewText);
    formData.append('review_type', reviewType);
    formData.append('order_id', selectedOrder.order_id);
    
    reviewForm.media.forEach(file => {
      formData.append('media', file.file);
    });

    await axios.post('http://localhost:8080/api/reviews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    // Refresh orders to show the new review
    const response = await axios.get('http://localhost:8080/api/user/orders', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    setOrders(response.data.orders);
    setSelectedOrder(null);
    setReviewForm({
      productId: null,
      businessId: null,
      rating: 0,
      reviewText: '',
      media: []
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    alert(error.response?.data?.message || error.response?.data?.error || 'Failed to submit review');
  }
};

 const AIProductImagesModal = () => {
  if (!showAIProductImages || !selectedAIProduct) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div 
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={() => setShowAIProductImages(false)}
          ></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">AI Product Images</h3>
              <button
                onClick={() => setShowAIProductImages(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedAIProduct.images.map((image, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={`AI Product ${index + 1}`}
                    className="w-full h-64 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setFileUploading(true);
    
    try {
      const uploadedFiles = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));

      setReviewForm(prev => ({
        ...prev,
        media: [...prev.media, ...uploadedFiles]
      }));
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setFileUploading(false);
    }
  };

  const removeMedia = (index) => {
    setReviewForm(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

const openReviewModal = (order, item = null, type = 'product') => {
  
  setReviewType(type);
  setSelectedOrder(order);
  
  // Determine the correct IDs based on order type and review type
  const isAIOrder = order.ai_order;
  const isProductReview = type === 'product';
  
  setReviewForm({
    productId: isProductReview && !isAIOrder ? item?.product_id : null,
    itemId: isProductReview && isAIOrder ? item?.item_id : null,
    businessId: type === 'business' ? order.business_id : null,
    rating: 0,
    reviewText: '',
    media: []
  });
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Orders</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="mt-2 text-gray-500">Your order history will appear here.</p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {showAIProductImages && <AIProductImagesModal />}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage your order history</p>
        </div>
        
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.order_id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-3 sm:mb-0">
                  <p className="text-sm font-semibold text-gray-900">
                    Order #{order.order_id}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    order.order_status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.order_status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.order_status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                  </span>
                  <p className="text-sm font-semibold text-gray-900">
                    ${Number(order.total_amount).toFixed(2)}
                  </p>
                  {order.order_status === 'pending' && (
                    <button
                      onClick={() => handleCancelOrder(order.order_id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
              
              {/* Order Items */}
              <div className="divide-y divide-gray-200">
                {order.items.map(item => (
                  <div key={item.item_id} className="p-5 flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product_image || 'https://via.placeholder.com/150'}
                        alt={item.product_name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h4 className="text-base font-medium text-gray-900">
                            {item.product_name}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Size: {item.size}, Qty: {item.quantity}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-gray-900">
                            ${Number(item.item_price).toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="mt-4 sm:mt-0">
                          {item.review_id ? (
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-5 w-5 ${i < item.review_rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-xs text-gray-500">Reviewed</span>
                            </div>
                          ) : (
                            order.order_status === 'delivered' && (
                              <button
                                onClick={() => openReviewModal(order, item, 'product')}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-200 shadow-sm text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Review Product
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-5 flex justify-between items-end">
                        <div className="flex items-center">
                          {order.business_logo_url && (
                            <img 
                              src={`http://localhost:8080${order.business_logo_url}`} 
                              alt={order.business_name}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                          )}
                          <span className="text-sm text-gray-600">{order.business_name}</span>
                        </div>
                        
                        {order.ai_order ? (
                          <button
                            onClick={() => fetchAIProductImages(item.item_id)}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            View AI Product
                          </button>
                        ) : (
                          <Link
                            to={`/product/viewProduct/${item.url_key}`}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            View product
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Business Review Section */}
              {order.order_status === 'delivered' && (
                <div className="border-t border-gray-200 px-5 py-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {order.business_logo_url && (
                        <img 
                          src={`http://localhost:8080${order.business_logo_url}`} 
                          alt={order.business_name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Purchased from {order.business_name}</h4>
                        <p className="text-xs text-gray-500">How was your experience with this seller?</p>
                      </div>
                    </div>
                    {order.business_review_id ? (
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < order.business_review_rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-gray-500">Reviewed</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => openReviewModal(order, null, 'business')}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-200 shadow-sm text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Review Seller
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {selectedOrder && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-xl shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-6 py-5 sm:p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {reviewType === 'product' ? 'Product Review' : 'Seller Review'}
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-4">
                  {reviewType === 'product' ? (
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={selectedOrder.items[0]?.product_image || 'https://via.placeholder.com/150'}
                          alt={selectedOrder.items[0]?.product_name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          {selectedOrder.items[0]?.product_name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Purchased from {selectedOrder.business_name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center mb-4">
                      {selectedOrder.business_logo_url && (
                        <img 
                          src={`http://localhost:8080${selectedOrder.business_logo_url}`} 
                          alt={selectedOrder.business_name}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{selectedOrder.business_name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Your experience with this seller</p>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <div className="flex items-center justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                            className="focus:outline-none transform hover:scale-110 transition-transform"
                          >
                            <svg
                              className={`h-10 w-10 ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-5">
                      <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
                        {reviewType === 'product' ? 'Product Review' : 'Seller Review'}
                      </label>
                      <textarea
                        id="review-text"
                        rows={4}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={reviewType === 'product' 
                          ? "Share your experience with this product..." 
                          : "Share your experience with this seller..."}
                        value={reviewForm.reviewText}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, reviewText: e.target.value }))}
                      ></textarea>
                    </div>
                    
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photos (optional)
                      </label>
                      <div className="flex items-center">
                        <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                          <span>{fileUploading ? 'Uploading...' : 'Upload photos'}</span>
                          <input
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={handleFileUpload}
                            accept="image/*"
                            disabled={fileUploading}
                          />
                        </label>
                        <span className="ml-3 text-xs text-gray-500">Up to 5 images</span>
                      </div>
                      
                      {reviewForm.media.length > 0 && (
                        <div className="mt-3 grid grid-cols-3 gap-3">
                          {reviewForm.media.map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={file.preview}
                                alt="Preview"
                                className="h-24 w-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeMedia(index)}
                                className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 shadow-sm transition-opacity"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(null)}
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        disabled={reviewForm.rating === 0}
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;