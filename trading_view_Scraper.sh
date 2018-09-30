###Phantom js script
script='tv.js'
printf "\nScript - $script"

###Get the output file name
file=$(grep -oh "tv_out[0-9]*.txt" $script)
printf "\nOutput File - $file"

##Search last covered symbol
lastSym=$(tail -1 $file|cut -d"," -f1)
printf "\nLast Symbol processed - $lastSym"

IFS=$'\n' read -d '' -r -a lines < /Users/anbu/Downloads/ind_nifty50list.csv
#IFS=$'\n' read -d '' -r -a lines </Users/anbu/Downloads/ind_nifty500list.csv


#printf "line 1: %s\n" "${lines[0]}"
#printf "line 5: %s\n" "${lines[4]}"

# all lines
#echo "${lines[@]}"

flag=1
if [[ ${#lastSym} -gt 0 ]]
then
	flag=0
fi

i=0
for var in "${lines[@]}"
do
  
  if [[ $i -gt 0 ]] 
  then
		  #echo "$i: ${var}"	
		  rec=$(cut -d',' -f3 <<< $var )
		  
		  if [[ flag -eq 0 ]]
		  then
		  		 ### Ignore the symbols
				 printf "\n$i - $rec - IGNORED!!!"
		  else
				 printf "\n$i - $rec"		  
				 command="phantomjs $script $rec"
				 printf "\n$command"
	   	    	 eval $command
		  
				 sleep 3
		  fi
		  
		  ###Enable processing flag once the last symbol is crossed
		  if [[ $rec = $lastSym ]]
		  then
		  		flag=1
		  fi
  fi
  i=$((i+1));
    
done

