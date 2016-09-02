function getMappa(data,num){
	var _map = [];
	var contaMap = 0;
	var _mappa = data.split("[");
	var j=0;
	var s=0;
	for(var i=0;i<=1;i++)
	{
		if(typeof _mappa[j]!=='undefined' && (_mappa[j].length==0||_mappa[j].length==1))
		{
			_map[i]=new Array();
			
			j++;
			for(s=0;j<_mappa.length&&_mappa[j].length>1;j++,s++)
			{
				_map[i][s] = new Array();
				var len = _mappa[j].length;
				var str = typeof _mappa[j+1]==='undefined' ||(_mappa[j+1].length==1||j+1==_mappa.length)? _mappa[j].substr(0,len-4):_mappa[j].substr(0,len-3);				
				var val = str.split(",");				
				for(var h=0;h<val.length;h++)
				{
					_map[i][s][h] = parseInt(val[h]);
				}
			}		
		}
	}
	return _map[num];
}