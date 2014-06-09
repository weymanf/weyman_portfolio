def deep_thunder(ar)
  depth = 0
  l = nil
  q = nil
  r = nil
  i = 0

  ar.each_with_index do | el, i |
 
    
 
 
    if l.nil? && el < ar[i-1]
      l = ar[i-1]
    end
    
    
    if l && q.nil? && el > ar[i - 1]
      q = ar[i -1]
     end
     

    if ((l && q && r.nil?) && (el < ar[i-1] || i + 1== ar.length )) 
     
    
      if ( i + 1== ar.length ) 
        r = ar[i]
        else
        r = ar[i - 1]
        end
      
      depth = [depth, [ l - q, r - q].min ].max
      l = ar[i - 1]
      q = nil
      r = nil

    end

  end

  return -1 if depth == 0
  return depth

end
